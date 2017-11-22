'use strict';

let debug = require('debug')('ali-oss:sts');
let crypto = require('crypto');
let querystring = require('querystring');
let copy = require('copy-to');
let AgentKeepalive = require('agentkeepalive');
let is = require('is-type-of');
let ms = require('humanize-ms');
let urllib = require('urllib');

let globalHttpAgent = new AgentKeepalive();

class STS {
  constructor(options) {
    if (!(this instanceof STS)) {
      return new STS(options);
    }

    if (!options
      || !options.accessKeyId
      || !options.accessKeySecret) {
      throw new Error('require accessKeyId, accessKeySecret');
    }

    this.options = {
      endpoint: options.endpoint || 'https://sts.aliyuncs.com',
      format: 'JSON',
      apiVersion: '2015-04-01',
      sigMethod: 'HMAC-SHA1',
      sigVersion: '1.0',
      timeout: '60s',
    };
    copy(options).to(this.options);

    // support custom agent and urllib client
    if (this.options.urllib) {
      this.urllib = this.options.urllib;
    } else {
      this.urllib = urllib;
      this.agent = this.options.agent || globalHttpAgent;
    }
  }

  async assumeRole(role, policy, expiration, session, options) {
    let opts = this.options;
    let params = {
      Action: 'AssumeRole',
      RoleArn: role,
      RoleSessionName: session || 'app',
      DurationSeconds: expiration || 3600,

      Format: opts.format,
      Version: opts.apiVersion,
      AccessKeyId: opts.accessKeyId,
      SignatureMethod: opts.sigMethod,
      SignatureVersion: opts.sigVersion,
      SignatureNonce: Math.random(),
      Timestamp: new Date().toISOString(),
    };

    if (policy) {
      let policyStr;
      if (is.string(policy)) {
        try {
          policyStr = JSON.stringify(JSON.parse(policy));
        } catch (err) {
          throw new Error('Policy string is not a valid JSON: ' + err.message);
        }
      } else {
        policyStr = JSON.stringify(policy);
      }
      params.Policy = policyStr;
    }

    let signature = this._getSignature('POST', params, opts.accessKeySecret);
    params.Signature = signature;
    let reqUrl = opts.endpoint;
    let reqParams = {
      agent: this.agent,
      timeout: ms(options && options.timeout || opts.timeout),
      method: 'POST',
      content: querystring.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ctx: options && options.ctx,
    };

    let result = await this.urllib.request(reqUrl, reqParams);
    debug('response %s %s, got %s, headers: %j',
      reqParams.method, reqUrl, result.status, result.headers);

    if (Math.floor(result.status / 100) !== 2) {
      let err = await this._requestError(result);
      err.params = reqParams;
      throw err;
    }
    result.data = JSON.parse(result.data);

    return result.data.Credentials;
  }


  async _requestError(result) {
    let err = new Error();
    err.status = result.status;

    try {
      let resp = await JSON.parse(result.data) || {};
      err.code = resp.Code;
      err.message = resp.Code + ': ' + resp.Message;
      err.requestId = resp.RequestId;
    } catch (e) {
      err.message = 'UnknownError: ' + String(result.data);
    }

    return err;
  }

  _getSignature(method, params, key) {
    let that = this;
    let canoQuery = Object.keys(params).sort().map(function(key) {
      return that._escape(key) + '=' + that._escape(params[key]);
    })
      .join('&');

    let stringToSign =
      method.toUpperCase() +
      '&' + this._escape('/') +
      '&' + this._escape(canoQuery);

    debug('string to sign: %s', stringToSign);

    let signature = crypto.createHmac('sha1', key + '&');
    signature = signature.update(stringToSign).digest('base64');

    debug('signature: %s', signature);

    return signature;
  }

  _escape(str) {
    return encodeURIComponent(str).replace(/\*/g, '%2A');
  }

}

module.exports = STS;