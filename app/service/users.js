const Service = require('egg').Service;

class UserService extends Service {
  async find(query) {
    return await this.ctx.model.Users.find(query);
  }
  async create(user) {
    let {Users} = this.ctx.model;
    let u = await Users.findOne({username: user.username});
    if (u) return {error: 'username exist'};
    return await Users.create(user);
  }
}

module.exports = UserService;
