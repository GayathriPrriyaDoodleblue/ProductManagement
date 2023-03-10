//const moment = require('moment-timezone');
const bcrypt = require('bcrypt');
const adminModel = require('../models/admin.model');
const merchantModel = require('../models/merchant.model');
const deliveryModel = require('../models/delivery.model');
const {generateTokenAdmin}=require('../middleware/jwt');

function adminService() {}

adminService.prototype.createAdmin = async function (adminData) {
  try{
  const { name, email, password,role } = adminData;
  if(role=='admin'){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const admin = await adminModel.query().insert({ name, email, password: hashedPassword, role });

    return admin;
  }
  else if(role !=='admin'){
    return 'Role must be admin';  }
  } 
  catch (error) {
    console.log(error);
    throw new Error('Unable to create admin.');
  }
};

adminService.prototype.login = async function (loginData) {
  try{
  const { email, password,role } = loginData;
    if(role =='admin'){
    const admin = await adminModel.query().where({ 'email': email, 'role': role }).first();
     
    const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        throw new Error('Invalid email or password.');
    }
    const token = generateTokenAdmin(admin);

        return { id: admin.id, name: admin.name, email: admin.email, token };
       
  } else if(role !=='admin'){
    return 'Role must be admin';
  }
}catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};
adminService.prototype.createMerchant = async function (MerchantData) {
  try{
  const { name , email, password,role} = MerchantData;
  if(role=='merchant'){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const merchant = await merchantModel.query()
      .insert({ name, email, password: hashedPassword ,role});

    return merchant;
    }
    else if(role !=='merchant'){
      return 'Role must be merchant';
    }
  } catch (error) {
    console.log(error);
    throw new Error('Unable to create admin.');
  }
};

adminService.prototype.createDelivery = async function (DeliveryData) {
  try{
  const { name , email, password,role} = DeliveryData;
  if(role=='delivery'){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const merchant = await deliveryModel.query()
      .insert({ name, email, password: hashedPassword ,role});

    return merchant;
    }
    else if(role !=='delivery'){
      return 'Role must be delivery';
    }
  } catch (error) {
    console.log(error);
    throw new Error('Unable to create delivery.');
  }
};


module.exports = new adminService();
