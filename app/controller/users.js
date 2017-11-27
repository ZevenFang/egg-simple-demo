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
  getToken(payload) {
    let {secret, expiresIn, refreshExpireIn} = this.config.jwt;
    const token = this.app.jwt.sign(
      payload, secret, {expiresIn}
    );
    const refresh_token = this.app.jwt.sign(
      payload, secret, {expiresIn: refreshExpireIn}
    );
    return {token, refresh_token, expiresIn, refreshExpireIn};
  }
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
      let payload = {username: u.username, age: u.age};
      ctx.body = this.getToken(payload);
    } else ctx.body = {error: 'login fail'};
  }
  async refresh() {
    const ctx = this.ctx;
    let u = ctx.state.user;
    let payload = {username: u.username, age: u.age};
    ctx.body = this.getToken(payload);
  }
  async api() {
    this.ctx.body = this.ctx.state.user;
  }
}

module.exports = UsersController;