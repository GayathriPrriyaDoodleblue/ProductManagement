const {Model} = require('objection');

class order extends Model {
    static get tableName(){
        return 'ordertable'
    }
   
} 

module.exports = order
// const { Model } = require('objection');
// const Product = require('../models/product.model');
// const User = require('../models/user.model');

// class Order extends Model {
//   static get tableName() {
//     return 'ordertable';
//   }

//   static get relationMappings() {
//     return {
//       product: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: Product,
//         join: {
//           from: 'ordertable.product_id',
//           to: 'producttable.id'
//         }
//       },
//       user: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: User,
//         join: {
//           from: 'ordertable.user_id',
//           to: 'usertable.id'
//         }
//       }
//     };
//   }
// }

// module.exports = Order;
