const db = require('../config/db');

class merchantServiceModel {
    static createMerchant(merchant) {
        return new Promise((resolve, reject) => {
            let dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            db.serialize(() => {
                db.run(`INSERT INTO merchants (username, email, password, address, phone, join_date) VALUES (?, ?, ?, ?, ?, ?)`,
                    [merchant.username, merchant.email, merchant.password, merchant.address, merchant.phone, dateNow], function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(merchant);
                        }
                    });
            });
        });
    }
    static findMerchantById(merchantId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM merchants WHERE id = ?`, [merchantId], (err, merchant) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static findMerchantByName(merchantName) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM merchants WHERE username = ?`, [merchantName], (err, merchant) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static findMerchantByEmail(merchantEmail) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM merchants WHERE email = ?`, [merchantEmail], (err, merchant) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static findAllMerchants() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM merchants`, (err, merchants) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(merchants);
                    }
                });
            });
        });
    }
    static findAllMerchantsProducts() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM merchants INNER JOIN products ON merchants.id = products.merchant_id`, (err, merchants) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(merchants);
                    }
                });
            });
        });
    }
    static checkAdmin(merchantName, merchantPassword) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM merchants WHERE username = ? AND password = ?`, [merchantName, merchantPassword], (err, merchant) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static updateMerchantById(merchantId, merchant) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE merchants SET username = ?, email = ?, password = ?, address = ?, phone = ?,  WHERE id = ?`,
                    [merchant.username, merchant.email, merchant.password, merchant.address, merchant.phone, merchantId], function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(merchant);
                        }
                    });
            });
        });
    }
    static updateMerchantByName(merchantName, merchant) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE merchants SET username = ?, email = ?, password = ?, address = ?, phone = ?,  WHERE name = ?`,
                    [merchant.username, merchant.email, merchant.password, merchant.address, merchant.phone, , merchantName], function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(merchant);
                        }
                    });
            });
        });
    }
    static deleteMerchantById(merchantId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM merchants WHERE id = ?`, [merchantId], function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(merchantId);
                    }
                });
            });
        });
    }
    static deleteMerchantByName(merchantName) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM merchants WHERE username = ?`, [merchantName], function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(merchantName);
                    }
                });
            });
        });
    }
}

module.exports = merchantServiceModel;