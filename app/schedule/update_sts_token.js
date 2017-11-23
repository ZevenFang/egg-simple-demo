module.exports = app => {
  return {
    schedule: {
      interval: (app.config.oss.expire - 5) * 1000, // 提前 5s 刷新
      type: 'all',
      // disable: app.config.env === 'local', // 本地开发环境不执行
    },
    async task(ctx) {
      ctx.app.stsToken = await app.sts.assumeRole(
        app.config.oss.role,
        app.config.oss.policy,
        app.config.oss.expire,
        app.config.oss.session
      );
      app.logger.info('[update_sts_token] execute update sts token task');
    },
  };
};
