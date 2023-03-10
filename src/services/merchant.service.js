const merchantModel = require('../models/merchant.model');
const bcrypt = require('bcrypt');
const {generateTokenMerchant}=require('../middleware/jwt');
const productModel = require('../models/product.model');
const xlsx = require('xlsx');
function merchantService() {

  merchantService.prototype.loginMerchant = async function (loginData) {
    const { email, password ,role} = loginData;
    try {
      const merchant = await merchantModel.query().where({ 'email': email, 'role': role }).first();
  
      if (!merchant) {
        throw new Error('Invalid email or password.');
      }
      const isPasswordValid = await bcrypt.compare(password, merchant.password);
  
        if (!isPasswordValid) {
          throw new Error('Invalid email or password.');
      }
      const token = generateTokenMerchant(merchant);
  
          return { id: merchant.id, name: merchant.name, email: merchant.email,token };
         
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }       
    };

    merchantService.prototype.uploadProduct = async function (file) {
        try {
            if (!file) {
                throw new Error('No file uploaded');
            }
            const workbook = xlsx.read(file.data, { type: 'buffer' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(sheet);
            for (let i = 0; i < data.length; i++) {
                const row = data[i];
                const product = {
                    product_name: row.product_name,
                    product_description: row.product_description,
                    product_cost: row.product_cost,
                    product_color: row.product_color,
                    product_brand: row.product_brand
                };
                await productModel.query().insert(product);
               
            }
        } catch (error) {
            console.log(error);
            throw new Error('Unable to create products');
        }
    };

    merchantService.prototype.getAllProducts = async function () {
        try {
            const products = await productModel.query();
            return products;
        } catch (error) {
            console.log(error);
            throw new Error('Unable to fetch products');
        }
    };
    merchantService.prototype.getByDateOrIdOrSearchProduct = async function (id, date, query) {
        try {
          const data = productModel.query();
          if (id) {
            data.where({ id });
          } else if (date) {
            data.whereRaw(`date(created_at) = '${date}'`);
          } else if (query) {
            data.where(function() {
              this.where('product_name', 'like', `%${query}%`)
                .orWhere('product_description', 'like',`%${query}%`)
                .orWhere('product_cost', 'like', `%${query}%`)
                .orWhere('product_color', 'like', `%${query}%`)
                .orWhere('product_brand', 'like', `%${query}%`)
            });
          } else {
            throw new Error('Invalid query parameters.');
          }
          const products = await data.select('*');
          if (products.length > 0) {
            return products;
          } else {
            throw new Error('No products found.');
          }
        } catch (error) {
          console.error(error);
          throw new Error('Unable to fetch products.');
        }
      };
      merchantService.prototype.updateProduct = async function (id, productData) {
        try {
            const updatedRows = await productModel.query().where({ id }).update(productData);

            if (updatedRows === 0) {
                return null;
            }

            const updatedProduct = await productModel.query().where({ id }).first();
            return updatedProduct;
        } catch (error) {
            console.error(error);
            throw new Error('Unable to update product');
        }
    };

    merchantService.prototype.deleteProduct = async function (id) {
        try {
            const deletedRows = await productModel.query().where({ id }).del();
            if (deletedRows === 0) {
                throw new Error('Product not found');
            }
            return true;
        } catch (error) {
            console.log(error);
            throw new Error('Unable to delete product');
        }
    }; 
 }

module.exports = new merchantService();