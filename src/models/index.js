
const dbConfig = require('../config/db');
 dbConfig();
module.exports={
  admin:require('./admin.model'),
  merchant:require('./merchant.model'),
  user:require('./user.model'),
  delivery:require('./delivery.model'),

};