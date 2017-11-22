'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1510881582682_7976';

  // add your config here
  config.middleware = [];

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.news = {
    serverUrl: 'https://news-at.zhihu.com/api/4',
  };

  // add middleware
  config.middleware = [
    'errorHandler', 'robot',
  ];
  // 对所有的 url 路径生效
  config.errorHandler = {
    match: '/',
  };
  // robot's configurations
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/example',
    options: {},
  };

  config.security = {
    csrf: {
      enable: false, // 关闭 csrf, 只在前后端分离项目使用
    },
  };

  config.jwt = {
    secret: 'egg-simple-demo',
    enable: true, // default is false
    match: '/api',
  };

  // if config.sts == true, oss will create STS client
  config.oss = {
    client: {
      accessKeyId: 'accessKeyId',
      accessKeySecret: 'accessKeySecret',
    },
    role: 'role',
    expire: 15 * 60,
    session: 'egg-simple-demo',
  };

  return config;
};
