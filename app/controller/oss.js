/**
 * restful template
 */

const {Controller} = require('egg');

class OssController extends Controller {

  async index() {
    await this.ctx.render('oss/index.tpl');
  }
  async token() {
    this.ctx.body = this.app.stsToken;
  }

}

module.exports = OssController;