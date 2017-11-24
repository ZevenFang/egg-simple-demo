const Service = require('egg').Service;
const qs = require('qs');

class WeixinService extends Service {

  constructor(props) {
    super(props);
    this.host = 'https://api.weixin.qq.com/cgi-bin';
  }

  async token(appid, secret) {
    let params = {
      grant_type: 'client_credential',
      appid, secret,
    };
    return await this.ctx.curl(`${this.host}/token?${qs.stringify(params)}`, {
      dataType: 'json',
    });
  }
}

module.exports = WeixinService;
