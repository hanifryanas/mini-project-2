const db = require('../config/db');

class merchantServiceModel{
    static findMerchantById(merchantId){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM merchants WHERE id = ?`, [merchantId], (err, merchant) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static findMerchantByName(merchantName){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM merchants WHERE name = ?`, [merchantName], (err, merchant) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static findMerchantByEmail(merchantEmail){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM merchants WHERE email = ?`, [merchantEmail], (err, merchant) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static createMerchant(merchant){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO merchants (name, email, password, address, phone, join_date, last_login) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [merchant.name, merchant.email, merchant.password, merchant.address, merchant.phone, merchant.join_date, merchant.last_login], function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static getAllMerchants(){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM merchants`, (err, merchants) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(merchants);
                    }
                });
            });
        });
    }
    static updateMerchant(merchantId, merchant){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE merchants SET name = ?, email = ?, password = ?, address = ?, phone = ?, join_date = ?, last_login = ? WHERE id = ?`, 
                [merchant.name, merchant.email, merchant.password, merchant.address, merchant.phone, merchant.join_date, merchant.last_login, merchantId], function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(merchant);
                    }
                });
            });
        });
    }
    static deleteMerchant(merchantId){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM merchants WHERE id = ?`, [merchantId], function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(merchantId);
                    }
                });
            });
        });
    }
}
module.exports = merchantServiceModel;