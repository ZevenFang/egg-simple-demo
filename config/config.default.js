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

  // add middleware robot
  config.middleware = [
    'robot',
  ];
  // robot's configurations
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };

  return config;
};
