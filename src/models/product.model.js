const { Model } = require('objection');

class product extends Model {
  static get tableName() {
    return 'producttable';
  }

  static get idColumn() {
    return 'id';
  }
}
module.exports = product