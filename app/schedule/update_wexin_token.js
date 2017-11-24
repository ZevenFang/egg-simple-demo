module.exports = app => {
  return {
    schedule: {
      interval: (app.config.oss.expire - 5) * 1000, // 提前 5s 刷新
      type: 'worker',
      // disable: app.config.env === 'local', // 本地开发环境不执行
    },
    async task() {
      app.logger.info('[update_wexin_token] execute update sts token task');
    },
  };
};
