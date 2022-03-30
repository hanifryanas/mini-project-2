const merchantServiceModel = require('../models/merchantService.js');
const fs = require('fs');
const db = require('../config/db');

class controllerProducts{
    static getAllProducts(req, res){
        const data = JSON.parse(fs.readFileSync('./products.json'));
        console.log(data);
        res.status(200).json(data);
    }
    static getProductByName(req, res){
        const data = JSON.parse(fs.readFileSync('./products.json'));
        console.log(data);
        if(req.params.name == null || req.params.name == undefined || typeof(req.params.name) != 'string' || req.params.name.length < 6) {
            res.status(400).json({
                message: 'Invalid name'
            })
        }
        const existingId = merchantServiceModel.findbyName(req.params.name);
        if(existingId) {
            res.status(200).json(existingId);
        }
        res.status(404).json({
            message: 'Product not found'
        });
    }
}

module.exports = controllerProducts;