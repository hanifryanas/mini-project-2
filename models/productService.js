const db = require('../config/db');

class productServiceModel {
    static getAllProducts(merchant_id) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE merchant_id = ?`, [merchant_id], (err, products) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(products);
                    }
                });
            });
        });
    }
    static findProductByName(merchantId, productName) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE merchant_id = ? AND name = ?`, [merchantId, productName], (err, product) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(product);
                    }
                });
            });
        });
    }
    static findProductById(merchantId, productId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE merchant_id = ? AND id = ?`, [merchantId, productId], (err, product) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(product);
                    }
                });
            });
        });
    }
    static createProduct(merchantId, product) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO products (merchant_id, name, quantity, price) VALUES (?, ?, ?, ?)`,
                    [merchantId, product.name, product.quantity, product.price], function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(product);
                        }
                    });
            });
        });
    }
    static updateProductById(merchant_id, product_id, product) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ? AND merchant_id = ?`,
                    [product.name, product.quantity, product.price, product_id, merchant_id], function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(product);
                        }
                    });
            });
        });
    }
    static updateProductByName(merchant_id, product_name, product) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE products SET name = ?, quantity = ?, price = ? WHERE name = ? AND merchant_id = ?`,
                    [product.name, product.quantity, product.price, product_name, merchant_id], function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(product);
                        }
                    });
            });
        });
    }
    static deleteProductById(merchant_id, product_id) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM products WHERE id = ? AND merchant_id = ?`, [product_id, merchant_id], function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(product_id);
                    }
                });
            });
        });
    }
    static deleteProductByName(merchant_id, product_name) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM products WHERE name = ? AND merchant_id = ?`, [product_name, merchant_id], function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(product_name);
                    }
                });
            });
        });
    }
}

module.exports = productServiceModel;