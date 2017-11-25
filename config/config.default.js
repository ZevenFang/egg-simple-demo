'use strict';

let oss = require('./oss.config');
let weixin = require('./weixin.config');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1510881582682_7976';

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
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

  config.oss = {
    client: {
      accessKeyId: oss.accessKeyId,
      accessKeySecret: oss.accessKeySecret,
    },
    role: oss.role,
    expire: 3600,
    session: 'egg-simple-demo',
    policy: null,
  };

  config.weixin = {
    appid: weixin.APPID,
    secret: weixin.APPSECRET,
  };

  return config;
};
