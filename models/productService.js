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
    static getAllProducts(merchant_id){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE merchant_id = ?`, [merchant_id], (err, products) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(products);
                    }
                });
            });
        });
    }
    static createProduct(merchantid, product){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO products (merchant_id, name, quantity, price) VALUES (?, ?, ?, ?)`, 
                [merchantid, product.name, product.quantity, product.price], function(err){
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
    static updateProduct(merchant_id, product_id, product){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ? AND merchant_id = ?`, 
                [product.name, product.quantity, product.price, product_id, merchant_id], function(err){
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
    static deleteProduct(merchant_id, product_id){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM products WHERE id = ? AND merchant_id = ?`, [product_id, merchant_id], function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(product_id);
                    }
                });
            });
        });
    }
}

module.exports = productServiceModel;