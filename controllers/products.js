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
    static async getProductByName(req, res){
        const merchantId = req.params.id;
        const productName = req.params.productName;
        const product = await productServiceModel.getProductByName(merchantId, productName);
        if(product){
            res.status(200).json(product);
        }
        else{
            res.status(404).send('Product not found');
        }
    }
    static async createProduct(req, res){
        const merchantId = req.params.id;
        const product = req.body;
        const newProduct = await productServiceModel.createProduct(merchantId, product);
        if(newProduct){
            res.status(201).json(newProduct);
        }
        else{
            res.status(404).send('Product not created');
        }
    }
    static async updateProduct(req, res){
        const merchantId = req.params.id;
        const productId = req.params.productId;
        const product = req.body;
        const updatedProduct = await productServiceModel.updateProduct(merchantId, productId, product);
        if(updatedProduct){
            res.status(201).json(updatedProduct);
        }
        else{
            res.status(404).send('Product not found');
        }
    }
    static async deleteProduct(req, res){
        const merchantId = req.params.id;
        const productId = req.params.productId;
        const deletedProduct = await productServiceModel.deleteProduct(merchantId, productId);
        if(deletedProduct){
            res.status(201).send(deletedProduct.name,'deleted');
        }
        else{
            res.status(404).send('Product not found');
        }
    }
}

module.exports = controllerProducts;