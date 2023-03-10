const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin.model');
const merchantModel=require('../models/merchant.model');
const userModel=require('../models/user.model');
const deliveryModel = require('../models/delivery.model');

const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('token required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.query().findById(decoded.id);

        if (!admin) {
            throw new Error('Unauthorized');
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Unauthorized' });
    }
};

const generateTokenAdmin = (admin) => {
    const token = jwt.sign({ id: admin.id, name: admin.name, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
};

const authMerchant = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('token required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const merchant = await merchantModel.query().findById(decoded.id);

        if (!merchant ) {
            throw new Error('Unauthorized');
        }

        req.merchant = merchant;
        next();
    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Unauthorized' });
    }
};

const generateTokenMerchant = (merchant) => {
    const token = jwt.sign({ id: merchant.id, name: merchant.name, email: merchant.email, role: merchant.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
};

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('token required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.query().findById(decoded.id);

        if (!user ) {
            throw new Error('Unauthorized');
        }
        // if (req.body.user_id !== decoded.id) {
        //     return res.status(200).json({ status:500,Error: 'provide correct user id' });
        // }
        req.user = user;
        next();

    } catch (Error) {
        console.log(Error);
        return res.status(200).json({ Error: 'Unauthorized' });
    }
};

const generateTokenUser = (user) => {
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
};

const authDelivery = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('token required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const delivery = await deliveryModel.query().findById(decoded.id);
        
        if (!delivery ) {
            throw new Error('Unauthorized');
        }

        req.delivery = delivery;
        next();
    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Unauthorized' });
    }
};

const generateTokenDelivery = (delivery) => {
    const token = jwt.sign({ id: delivery.id, name: delivery.name, email: delivery.email, role: delivery.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
};

module.exports = {
    authAdmin,
    generateTokenAdmin,
    authMerchant,
    generateTokenMerchant,
    authUser,
    generateTokenUser,
    authDelivery,
    generateTokenDelivery,
};