const { Model } = require('objection');

class merchant extends Model {
  static get tableName() {
    return 'merchanttable';
  }

  static get idColumn() {
    return 'id';
  }
}
module.exports = merchant