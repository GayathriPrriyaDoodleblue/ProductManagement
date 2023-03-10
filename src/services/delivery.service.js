const bcrypt = require('bcrypt');
const cron = require('node-cron');
const deliveryModel = require('../models/delivery.model');
const statusModel = require('../models/status.model');
const orderModel=require('../models/order.model');
const {generateTokenDelivery}=require('../middleware/jwt');

function deliveryService() {}

deliveryService.prototype.loginDelivery = async function (loginData) {
    try{
    const { email, password,role } = loginData;
      if(role =='delivery'){
      const delivery = await deliveryModel.query().where({ 'email': email, 'role': role }).first();
       
      const isPasswordValid = await bcrypt.compare(password, delivery.password);
  
        if (!isPasswordValid) {
          throw new Error('Invalid email or password.');
      }
      const token = generateTokenDelivery(delivery);
  
          return { id: delivery.id, name: delivery.name, email: delivery.email, token };
         
    } else if(role !=='delivery'){
      return 'Role must be delivery';
    }
  }catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  };


  deliveryService.prototype.checkDelivery = async function (delivery_id, otp, id) {
    try {
        const order = await orderModel.query().where({ 'id': id, 'delivery_id': delivery_id }).first();
        if (order.otp == otp) {
            await statusModel.query().insert({
                order_id: id,
                status: "orderDispatched"
            });
            return "order Dispatched"
        }
        else if (order.otp !== otp) {
            throw new Error('Invalid OTP');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Unable to check otp.');

    }
};


  module.exports = new deliveryService();