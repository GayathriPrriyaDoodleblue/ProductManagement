const router = require('express').Router();
const adminControllers = require('../controllers/admin.controller');
const {authAdmin}=require('../middleware/jwt');
const {loginSchema,registerSchema}=require('../validate/joi');

router.post('/login', loginSchema,adminControllers.login);

router.post('/admins', registerSchema,adminControllers.createAdmin);

router.post('/merchant',authAdmin,registerSchema,adminControllers.createMerchant);

router.post('/delivery',authAdmin,registerSchema,adminControllers.createDelivery);

module.exports = router;