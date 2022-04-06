const db = require('../config/db');

class productServiceModel{
    static findProductByName(productName){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE name = ?`, [productName], (err, product) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(product);
                    }
                });
            });
        });
    }
    static createProduct(product){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO products (name, description, price, image, merchant_id) VALUES (?, ?, ?, ?, ?)`, 
                [product.name, product.description, product.price, product.image, product.merchant_id], function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(product);
                    }
                });
            });
        });
    }
    static getProductByName(productName){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE name = ?`, [productName], (err, product) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(product);
                    }
                });
            });
        });
    }
    static getProductById(productId){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, product) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(product);
                    }
                });
            });
        });
    }
}

module.exports = productServiceModel;