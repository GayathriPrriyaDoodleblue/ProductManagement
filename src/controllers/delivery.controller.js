const deliveryService = require('../services/delivery.service');

function deliveryController() {

    deliveryController.prototype.loginDelivery = async function (req, res) {
        try {
          const result = await deliveryService.loginDelivery(req.body);
          res.status(200).json({status:"success",data:result});
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      };


      deliveryController.prototype.checkDelivery = async function (req, res) {
        const delivery_id = req.query.delivery_id;
        const otp = req.query.otp;
        const id = req.query.id;
    
        try {
            const result = await deliveryService.checkDelivery(delivery_id, otp, id);
            res.json({status:"success",data:result});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    }
 module.exports = new deliveryController();
 