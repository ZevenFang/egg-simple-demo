'use strict';

module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/news', app.controller.news.list);
  app.get('/users', app.controller.users.index);
  app.get('/users/create', app.controller.users.create);
  app.resources('posts', '/posts', app.controller.posts);
};
