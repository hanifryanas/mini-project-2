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
            let dateNow = new Date();
            db.serialize(() => {
                db.run(`INSERT INTO merchants (name, email, password, address, phone, join_date) VALUES (?, ?, ?, ?, ?, ?)`, 
                [merchant.name, merchant.email, merchant.password, merchant.address, merchant.phone, dateNow], function(err){
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

    static findAllMerchants(){
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

    static checkAdmin(merchantName, merchantPassword){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM merchants WHERE name = ? AND password = ?`, [merchantName, merchantPassword], (err, merchant) => {
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

    static updateMerchantById(merchantId, merchant){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE merchants SET name = ?, email = ?, password = ?, address = ?, phone = ?,  WHERE id = ?`, 
                [merchant.name, merchant.email, merchant.password, merchant.address, merchant.phone, merchantId], function(err){
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

    static updateMerchantByName(merchantName, merchant){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE merchants SET name = ?, email = ?, password = ?, address = ?, phone = ?,  WHERE name = ?`, 
                [merchant.name, merchant.email, merchant.password, merchant.address, merchant.phone,, merchantName], function(err){
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

    static deleteMerchantById(merchantId){
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
    
    static deleteMerchantByName(merchantName){
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM merchants WHERE name = ?`, [merchantName], function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(merchantName);
                    }
                });
            });
        });
    }
}
module.exports = merchantServiceModel;