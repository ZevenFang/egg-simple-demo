const {Controller} = require('egg');

class AuthController extends Controller {

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
    await this.ctx.render('auth/index.tpl');
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
  async parse() {
    this.ctx.body = this.ctx.state.user;
  }

}

module.exports = AuthController;