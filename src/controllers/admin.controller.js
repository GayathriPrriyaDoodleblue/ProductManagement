
const adminService = require('../services/admin.service');

function adminController() {}

adminController.prototype.createAdmin = async function (req, res) {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.status(200).json({status:"success",data:admin});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to create admin.' });
  }
};

adminController.prototype.login = async function (req, res) {
  try {
    const loginResult = await adminService.login(req.body);
    res.status(200).json({status:"success",data:loginResult});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
adminController.prototype.createMerchant = async function (req, res) {
  try {
    const merchant = await adminService.createMerchant(req.body);
    res.status(200).json({status:"success",data:merchant});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to create admin.' });
  }
};

adminController.prototype.createDelivery = async function (req, res) {
  try {
    const delivery = await adminService.createDelivery(req.body);
    res.status(200).json({status:"success",data:delivery});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to create delivery.' });
  }
};

module.exports = new adminController();
