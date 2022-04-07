const merchantServiceModel = require('../models/merchantService.js');
const jwt = require('jsonwebtoken');

class controllerMerchants{
    static async getMerchantById(req, res){
        const merchantId = req.params.id;
        const merchant = await merchantServiceModel.findMerchantById(merchantId);        
        if(merchant){
            res.status(200).json(merchant);
        }
        else{
            res.status(404).send('Merchant not found');
        }
    }
    static async getMerchantByName(req, res){
        const merchantName = req.params.name;
        console.log(merchantName);
        const merchant = await merchantServiceModel.findMerchantByName(merchantName);
        if(merchant){
            res.status(200).json(merchant);
        }
        else{
            res.status(404).send('Merchant not found');
        }
    }
    static async createMerchant(req, res){
        let merchant = req.body;
        console.log(req.body);
        const existingMerchantName = await merchantServiceModel.findMerchantByName(req.body.name);
        const existingMerchantEmail = await merchantServiceModel.findMerchantByEmail(req.body.email);
        if(existingMerchantName){
            res.status(400).send('Merchant name already used');
        }
        else if(existingMerchantEmail){
            res.status(400).send('Merchant email already used');
        }
        else{
            merchantServiceModel.createMerchant(merchant)
            .then(() => {
                res.status(201).json(merchant);
            })
            .catch(err => {
                res.status(500).json(err);
            });
        }
        
    }
    static async updateMerchant(req, res){
        const merchantId = req.params.id;
        const merchant = req.body;
        const existingMerchantName = await merchantServiceModel.findMerchantByName(req.body.name);
        if(!existingMerchantName){
            res.status(400).send('Merchant not found');
        }
        else{
            merchantServiceModel.updateMerchant(merchantId, merchant)
            .then(() => {
                res.status(201).json(merchant);
            })
            .catch(err => {
                res.status(500).json(err);
            });
        }
    }
    static async deleteMerchant(req, res){
        const merchantId = req.params.id;
        merchantServiceModel.deleteMerchant(merchantId)
        .then(() => {
            res.status(201).send('Merchant deleted');
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
    static async loginMerchant(req, res){
        const userData = req.body;
        const merchant = await merchantServiceModel.findMerchantByEmail(userData.email);
        if(merchant){
            if(merchant.password === userData.password){
                const token = jwt.sign({
                    name: merchant.name
                },'zxcvbnm');
                res.status(200).json({ token });
            }
            else{
                res.status(401).json({ message: 'wrong password!'});
            }
        }
        else{
            res.status(401).json({ message: 'email does not exist!'});
        }
    }
}

module.exports = controllerMerchants;