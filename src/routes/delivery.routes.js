const router = require('express').Router();
 const deliveryControllers = require('../controllers/delivery.controller');
 const {authDelivery}=require('../middleware/jwt');
const {loginSchema}=require('../validate/joi');

router.post('/login',loginSchema,deliveryControllers.loginDelivery);

router.get('/check' ,authDelivery,deliveryControllers.checkDelivery);

module.exports = router;