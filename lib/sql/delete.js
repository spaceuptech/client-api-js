const sql = require('./sql');
const generateFind = require('../mongo/mongo').generateFind
const utils = require('../utils'),
  fetchAsync = utils.fetchAsync,
  and = utils.and;

/**
 * Class representing the SQL Delete Interface.
 * @example 
 * import { API, cond, or, and } from 'space-api';
 * 
 * const api = new API('my-project', 'http://localhost:8080');
 * 
 * // For MySQL Database
 * const db = api.MySQL();
 * 
 * // For PostgresQL Database
 * const db = api.Postgres();
 * 
 * db.delete('posts').where(and(cond('title', '==', 'Title1'))).all().then(res => {
 *   if (res.status === 200) {
 *     // The records were deleted successfully
 *     return;
 *   }
 * }).catch(ex => {
 *   // Exception occured while processing request
 * });
 */
class Delete {

  /**
   * Create an instance of the SQL Delete Interface.
   * @param {string} appId 
   * @param {string} table 
   * @param {string} url 
   * @param {Object} options 
   * @param {string} db 
   */
  constructor(appId, table, url, options, db, op) {
    this.appId = appId;
    this.url = url;
    this.db = db;
    this.options = Object.assign({}, options, { method: 'POST' });
    this.table = table;
    this.params = { find: {} };
    this.params.op = op;
    this.type = 'delete';
  }

  /**
   * Prepares the find query
   * @param {...Object} conditions - The condition logic.
   */
  where(...conditions) {
    this.params.find = generateFind(and(...conditions));
    return this;
  }

  /**
   * Makes the query to delete all the records which match. 
   * @returns {Promise} Returns a promise containing response from server.
   * @example
   * db.delete('posts').all().then(res => ...)
   * @deprecated Since version 0.4.3. Will be deleted in version 1.0.0. Use apply instead.
   */
  all() {
    this.params.op = 'all';
    this.options.body = JSON.stringify(this.params);
    let url = sql.sqlURL(this.url, this.db, this.appId, 'crud', `${this.table}/delete`);
    return fetchAsync(url, this.options);
  }

  apply(){
    this.options.body = JSON.stringify(this.params);
    let url = sql.sqlURL(this.url, this.db, this.appId, 'crud', `${this.table}/delete`);
    return fetchAsync(url, this.options);
  }
}

module.exports = Delete;