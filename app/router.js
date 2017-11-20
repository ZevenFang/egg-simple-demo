'use strict';

module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/news', app.controller.news.list);
  app.get('/user', app.controller.user.index);
  app.get('/user/create', app.controller.user.create);
  app.resources('posts', '/posts', app.controller.posts);
};
