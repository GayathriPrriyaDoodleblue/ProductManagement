const Joi=require('joi');
const loginSchema=(req,res,next)=>{
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role:Joi.string().optional()
});

const {error}=schema.validate(req.body);
if (error){
  return res.status(200).json({message:error.details[0].message});
}
next();
};
const registerSchema=(req,res,next)=>{
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role:Joi.string().optional()
  });
  
  const {error}=schema.validate(req.body);
  if (error){
    return res.status(200).json({message:error.details[0].message});
  }
  next();
  };

  const userSchema=(req,res,next)=>{
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      address:Joi.string().required(),
      mobileno:Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
      role:Joi.string().optional()
    });
    
    const {error}=schema.validate(req.body);
    if (error){
      return res.status(200).json({message:error.details[0].message});
    }
    req.body.mobileno = '+91-' + req.body.mobileno;

    next();
    }
module.exports = {loginSchema,registerSchema,userSchema};


// exports.up = function (knex) {
//   return knex.schema.createTable('usertable', function (table) {
//       table.increments('id').primary();
//       table.string('name');
//       table.string('email');
//       table.string('password');
//       table.string('address');
//       table.string('mobileno');
//       table.enu('role', ['admin', 'merchant', 'user', 'delivery']).defaultTo('user');
//       table.timestamps(true, true);
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists('usertable');
// };

// exports.up = function (knex) {
//   return knex.schema.createTable('admintable', function (table) {
//       table.increments('id').primary();
//       table.string('name');
//       table.string('email');
//       table.string('password');
//       table.enu('role', ['admin', 'merchant', 'user', 'delivery']).defaultTo('user');
//       table.timestamps(true, true);
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists('admintable');
// };

// exports.up = function (knex) {
//   return knex.schema.createTable('merchanttable', function (table) {
//       table.increments('id').primary();
//       table.string('name');
//       table.string('email');
//       table.string('password');
//       table.enu('role', ['admin', 'merchant', 'user', 'delivery']).defaultTo('user');
//       table.timestamps(true, true);
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists('merchanttable');
// };

// exports.up = function (knex) {
//   return knex.schema.createTable('producttable', function (table) {
//       table.increments('id').primary();
//       table.string('product_name');
//       table.string('product_description');
//       table.string('product_cost');
//       table.string('product_color');
//       table.string('product_brand');
//       table.timestamps(true, true);
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists('producttable');
// };

// exports.up = function (knex) {
//   return knex.schema.createTable('ordertable', function (table) {
//           table.increments('order_id').primary();
//           table.integer('product_id').unsigned().references('id').inTable('producttable');
//           table.integer('user_id').unsigned().references('id').inTable('usertable');
//           table.date('order_date');
//           table.integer('order_quantity');
//           table.integer('order_cost');  
//           table.timestamps(true, true);     
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists('ordertable');
// };
// exports.up = function (knex) {
//   return knex.schema.createTable('statustable', function (table) {
//       table.increments('status_id').primary();
//       table.integer('order_id').unsigned().references('id').inTable('ordertable');
//       table.string('status1');
//       table.string('status2');
//       table.string('status3');
//       table.string('status4');
//       table.timestamps(true, true);
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists('statustable');
// };

// exports.up = function (knex) {
//   return knex.schema.createTable('ordertable', function (table) {
//       table.increments('id').primary();
//       table.integer('product_id').unsigned().references('id').inTable('producttable');
//       table.integer('user_id').unsigned().references('id').inTable('usertable');
//       table.date('order_date');
//       table.integer('order_quantity');
//       table.integer('order_cost');
//       table.integer('otp');
//       table.integer('delivery_id').unsigned().references('id').inTable('deliverytable');
//       table.timestamps(true, true);
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists('ordertable');
// };