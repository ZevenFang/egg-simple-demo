/**
 * Created by fangf on 2017/11/18.
 */

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.find({});
  }
  async create() {
    const ctx = this.ctx;
    let {username, password} = ctx.query;
    ctx.body = await ctx.service.user.add(username, password);
  }
}

module.exports = UserController;