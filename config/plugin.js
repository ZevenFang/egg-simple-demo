'use strict';

// had enabled by egg
// exports.static = true;
module.exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
module.exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
module.exports.validate = {
  package: 'egg-validate',
};
module.exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
module.exports.oss = {
  enable: true,
  package: 'egg-oss',
};