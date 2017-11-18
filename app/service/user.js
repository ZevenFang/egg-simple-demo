const Service = require('egg').Service;

class UserService extends Service {
  async find(query) {
    return await this.ctx.model.User.find(query);
  }
  async add(username, password){
    return await this.ctx.model.User.create({username, password});
  }
}

module.exports = UserService;
