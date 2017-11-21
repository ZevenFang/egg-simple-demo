'use strict';

module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/news', app.controller.news.list);
  app.get('/users', app.controller.users.index);
  app.get('/users/list', app.controller.users.list);
  app.get('/users/create', app.controller.users.create);
  app.post('/users/token', app.controller.users.token);
  app.get('/api/users/token', app.controller.users.api);
  app.resources('posts', '/posts', app.controller.posts);
};
