/**
 * 测试 restful
 */

const {Controller} = require('egg');

let rule = {
  title: 'string',
  desc: 'string',
  thumb: 'int',
};

class PostsController extends Controller {

  async index() {
    await this.ctx.render('posts/index.tpl');
  }
  async create() {
    let data = this.ctx.request.body;
    data.thumb = parseInt(data.thumb);
    this.ctx.validate(rule, data);
    this.ctx.body = await this.ctx.model.Posts.create(data);
  }
  async show() {
    this.ctx.body = await this.ctx.model.Posts.findById(this.ctx.params.id);
  }
  async update() {
    let data = this.ctx.request.body;
    this.ctx.body = await this.ctx.model.Posts.updateOne(this.ctx.params.id, data);
  }
  async destroy() {

  }

}

module.exports = PostsController;