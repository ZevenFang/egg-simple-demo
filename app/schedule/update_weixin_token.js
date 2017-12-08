module.exports = app => {
  return {
    schedule: {
      interval: '7200s',
      type: 'worker',
      immediate: true,
    },
    async task(ctx) {
      const res = await ctx.service.weixin.token(app.config.weixin.appid, app.config.weixin.secret);
      ctx.app.wxToken = res.data;
      app.logger.info('[update_weixin_token] execute update weixin token task');
    },
  };
};
