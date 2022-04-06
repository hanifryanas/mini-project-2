const productServiceModel  = require('../models/productService.js');
const fs = require('fs');
const db = require('../config/db');

class controllerProducts{
    static async getAllProducts(req, res){
        const merchantId = req.params.id;
        const products = await productServiceModel.getAllProducts(merchantId);
        if(products){
            res.status(200).json(products);
        }
        else{
            res.status(404).send('Products not found');
        }
    }
}

module.exports = controllerProducts;