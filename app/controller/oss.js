/**
 * restful template
 */

const {Controller} = require('egg');

class OssController extends Controller {

  async index() {
    // await this.app.runSchedule('update_sts_token');
    this.ctx.body = this.app.stsToken;
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