const sql = require('./sql');
const utils = require('../utils'),
  fetchAsync = utils.fetchAsync;


class Batch {
  constructor(appId, url, options, db) {
    this.appId = appId;
    this.url = url;
    this.db = db;
    this.options = options;
    this.params = { reqs: [] };
  }

  add(req) {
    this.params.reqs.push(Object.assign({}, req.params, { col: req.table, type: req.type }))
    return this;
  }

  apply() {
    this.options.body = JSON.stringify(this.params);
    let url = sql.sqlURL(this.url, this.db, this.appId, 'crud', 'batch');
    return fetchAsync(url, this.options);
  }
}

module.exports = Batch;
