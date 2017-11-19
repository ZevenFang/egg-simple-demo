const Service = require('egg').Service;

class UserService extends Service {
  async find(query) {
    return await this.ctx.model.User.find(query);
  }
  async create(user){
    return await this.ctx.model.User.create(user);
  }
}

module.exports = UserService;
