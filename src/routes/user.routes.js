const router = require('express').Router();
 const userControllers = require('../controllers/user.controller');
 const {authUser}=require('../middleware/jwt');
const {userSchema,loginSchema}=require('../validate/joi');

router.post('/login',loginSchema,userControllers.loginUser);

router.post('/user',userSchema,userControllers.createUser);

router.get('/show',authUser, userControllers.showProducts);

router.get('/order', authUser,userControllers.showOrdersByIdorDate);

router.post('/purchase',authUser, userControllers.purchaseProducts);

router.get('/status',authUser, userControllers.statusOrder);

module.exports = router;