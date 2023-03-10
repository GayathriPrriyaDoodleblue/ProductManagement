const router = require('express').Router();
const merchantControllers = require('../controllers/merchant.controller');
const {authMerchant}=require('../middleware/jwt');
const {loginSchema}=require('../validate/joi');

router.post('/login', loginSchema,merchantControllers.loginMerchant);

router.post('/upload',authMerchant, merchantControllers.uploadProduct);

router.get('/all',authMerchant, merchantControllers.getAllProducts);

router.get('/query',authMerchant, merchantControllers.getByDateOrIdOrSearchProduct);

router.put('/update/:id',authMerchant, merchantControllers.updateProduct);

router.delete('/delete/:id',authMerchant, merchantControllers.deleteProduct);


module.exports = router;