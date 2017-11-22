const STS = require('../utils/STS');

module.exports = {
  get sts() {
    return new STS(this.config.oss.client);
  },
};
