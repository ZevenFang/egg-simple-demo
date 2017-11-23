/**
 * restful template
 */

const {Controller} = require('egg');

class OssController extends Controller {

  async index() {
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