/**
 * restful template
 */

const {Controller} = require('egg');

class OssController extends Controller {

  async index() {
    const token = this.app.oss.assumeRole(
      this.config.oss.role,
      this.config.oss.policy,
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