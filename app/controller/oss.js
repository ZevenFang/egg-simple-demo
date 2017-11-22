/**
 * restful template
 */

const {Controller} = require('egg');

class OssController extends Controller {

  async index() {
    const token = await this.app.sts.assumeRole(
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