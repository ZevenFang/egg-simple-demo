/**
 * 测试 mongodb
 */

const Controller = require('egg').Controller;

let rule = {
  username: 'string',
  password: 'string',
  age: 'int',
};

class UsersController extends Controller {
  async index() {
    await this.ctx.render('users/index.tpl');
  }
  async list() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.users.find({});
  }
  async create() {
    const ctx = this.ctx;
    ctx.query.age = parseInt(ctx.query.age);
    ctx.validate(rule, ctx.query);
    ctx.body = await ctx.service.users.create(ctx.query);
  }
  async token() {
    const ctx = this.ctx;
    let {username, password} = ctx.request.body;
    let u = await ctx.model.Users.findOne({username});
    if (u && u.password === password) {
      console.warn(u);
      const token = this.app.jwt.sign({username: u.username, age: u.age}, this.config.jwt.secret);
      ctx.body = {token};
    } else ctx.body = {error: 'login fail'}
  }
  async api() {
    this.ctx.body = this.ctx.state.user;
  }
}

module.exports = UsersController;