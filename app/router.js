'use strict';

module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/news', app.controller.news.list);
  app.get('/users/list', app.controller.users.list);
  app.get('/users/create', app.controller.users.create);
  app.resources('posts', '/posts', app.controller.posts);
  app.resources('oss', '/oss', app.controller.oss);
  app.get('/oss/token', app.controller.oss.token);
  app.get('/auth', app.controller.auth.index);
  app.post('/auth/token', app.controller.auth.token);
  app.get('/auth/token/refresh', app.controller.auth.refresh);
  app.get('/auth/token/parse', app.controller.auth.parse);
};
