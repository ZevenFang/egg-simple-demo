// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  async list() {
    // read config
    const serverUrl = 'https://news-at.zhihu.com/api/4';

    // use build-in http client to GET hacker-news api
    const { data: news } = await this.ctx.curl(`${serverUrl}/news/latest`, {
      dataType: 'json',
    });

    // parallel GET detail
    const stories = await Promise.all(
      news.stories.map(({ id }) => {
        const url = `${serverUrl}/news/${id}`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return stories.map(res => res.data);
  }
}

module.exports = NewsService;
