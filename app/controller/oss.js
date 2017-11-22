/**
 * restful template
 */

const {Controller} = require('egg');
const STS = require('../utils/STS');

class OssController extends Controller {

  async index() {
    let sts = new STS(this.config.oss.client);
    const token = await sts.assumeRole(
      this.config.oss.role, null,
      this.config.oss.expire,
      this.config.oss.session
    );
    this.ctx.body = token;
  }
  async create() {

  }
  async show() {

  }
  async update() {

  }
  async destroy() {

  }

}

module.exports = OssController;