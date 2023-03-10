const merchantService = require('../services/merchant.service');

function merchantController() {

    merchantController.prototype.loginMerchant = async function (req, res) {
        try {
          const result = await merchantService.loginMerchant(req.body);
          res.status(200).json({status:"success",data:result});
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      };
      
    merchantController.prototype.uploadProduct = async function (req, res) {
        try {
            const result = await merchantService.uploadProduct(req.files.file);
            res.status(200).json({status:"success",data:"File Uploaded Successfully"});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating the product.' });
        }
    };

    merchantController.prototype.getAllProducts = async function (req, res) {
        try {
            const products = await merchantService.getAllProducts();
            res.status(200).json({status:"success",data:products});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching products.' });
        }
    };

    merchantController.prototype.getByDateOrIdOrSearchProduct = async function (req, res) {
        const { id, date, query } = req.query;
        try {
          const products = await merchantService.getByDateOrIdOrSearchProduct(id, date, query);
          res.status(200).json({status:"success",data:products});
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'An error occurred while fetching products.' });
        }
      };
      merchantController.prototype.updateProduct = async function (req, res) {
        const { id } = req.params;
        const { product_name, product_description, product_cost, product_color, product_brand } = req.body;

        try {
            const product = await merchantService.updateProduct(id, {
                product_name,
                product_description,
                product_cost,
                product_color,
                product_brand
            });

            if (!product) {
                return res.status(200).json({ message: 'Product not found' });
            }

            return res.status(200).json({status:"success",data:product});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to update product' });
        }
    };

    merchantController.prototype.deleteProduct = async function (req, res) {
        const { id } = req.params;

        try {
            const isDeleted = await merchantService.deleteProduct(id);

            if (!isDeleted) {
                return res.status(200).json({ message: 'Product not found' });
            }

            return res.status(200).json({status:"success",data:"product deleted successfully"});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unable to delete product' });
        }
    };
    
}

module.exports = new merchantController();