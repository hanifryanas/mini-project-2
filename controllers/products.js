const productServiceModel = require('../models/productService.js');

class controllerProducts {
    static async getAllProducts(req, res) {
        const merchantId = req.params.id;
        const products = await productServiceModel.getAllProducts(merchantId);
        if (products) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('products not found');
        }
    }
    static async getProductById(req, res) {
        const merchantId = req.params.id;
        const productId = req.params.productId;
        const product = await productServiceModel.findProductById(merchantId, productId);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).send('product not found');
        }
    }
    static async getProductByName(req, res) {
        const merchantId = req.params.id;
        const productName = req.params.productName;
        const product = await productServiceModel.findProductByName(merchantId, productName);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).send('product not found');
        }
    }
    static async createProduct(req, res) {
        const merchantId = req.params.id;
        const product = req.body;
        const newProduct = await productServiceModel.createProduct(merchantId, product);
        if (newProduct) {
            res.status(201).json(newProduct);
        }
        else {
            res.status(404).send('product not created');
        }
    }
    static async updateProduct(req, res) {
        const merchantId = req.params.id;
        const productId = req.params.productId;
        const productName = req.params.productName;
        const product = req.body;
        if (productId) {
            const updatedProduct = await productServiceModel.updateProductById(merchantId, productId, product);
            if (updatedProduct) {
                res.status(201).json(updatedProduct);
            }
            else {
                res.status(404).send('product not found');
            }
        }
        else if (productName) {
            const updatedProduct = await productServiceModel.updateProductByName(merchantId, productName, product);
            if (updatedProduct) {
                res.status(201).json(updatedProduct);
            }
            else {
                res.status(404).send('product not found');
            }
        }
    }
    static async deleteProduct(req, res) {
        const merchantId = req.params.id;
        const productId = req.params.productId;
        const productName = req.params.productName;
        if (productId) {
            const deletedProduct = await productServiceModel.deleteProductById(merchantId, productId);
            if (deletedProduct) {
                res.status(204).json(`product ${productId} has been deleted`);
            }
            else {
                res.status(404).send('product not found');
            }
        }
        else if (productName) {
            const deletedProduct = await productServiceModel.deleteProductByName(merchantId, productName);
            if (deletedProduct) {
                res.status(204).json(`product ${productName} has been deleted`);
            }
            else {
                res.status(404).send('product not found');
            }
        }
    }
}

module.exports = controllerProducts;