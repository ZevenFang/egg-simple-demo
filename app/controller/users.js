/**
 * 测试 mongodb
 */

const Controller = require('egg').Controller;

let rule = {
  username: 'string',
  password: 'string',
  age: 'int',
};

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.users.find({});
  }
  async create() {
    const ctx = this.ctx;
    ctx.query.age = parseInt(ctx.query.age);
    ctx.validate(rule, ctx.query);
    ctx.body = await ctx.service.users.create(ctx.query);
  }
}

module.exports = UserController;