const merchantServiceModel = require('../models/merchantService.js');
const jwt = require('jsonwebtoken');

class controllerMerchants {
    static async getMerchantById(req, res) {
        const merchantId = req.params.id;
        const merchant = await merchantServiceModel.findMerchantById(merchantId);
        if (merchant) {
            res.status(200).json(merchant);
        }
        else {
            res.status(404).send('merchant not found');
        }
    }
    static async getMerchantByName(req, res) {
        const merchantName = req.params.name;
        const merchant = await merchantServiceModel.findMerchantByName(merchantName);
        if (merchant) {
            res.status(200).json(merchant);
        }
        else {
            res.status(404).send('merchant not found');
        }
    }
    static async getAllMerchants(req, res) {
        const merchants = await merchantServiceModel.findAllMerchants();
        if (merchants) {
            res.status(200).json(merchants);
        }
        else {
            res.status(404).send('merchant not found');
        }
    }
    static async getAllMerchantsProducts(req, res) {
        const totalDataProducts = await merchantServiceModel.findAllMerchantsProducts();
        if (totalDataProducts) {
            res.status(200).json(totalDataProducts);
        }
        else {
            res.status(404).send('data not found');
        }
    }
    static async createMerchant(req, res) {
        let merchant = req.body;
        const existingMerchantName = await merchantServiceModel.findMerchantByName(req.body.name);
        const existingMerchantEmail = await merchantServiceModel.findMerchantByEmail(req.body.email);
        if (existingMerchantName) {
            res.status(400).send('merchant name already used');
        }
        else if (existingMerchantEmail) {
            res.status(400).send('merchant email already used');
        }
        else {
            merchantServiceModel.createMerchant(merchant)
                .then(() => {
                    res.status(201).json(merchant);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    }
    static async updateMerchant(req, res) {
        const merchantId = req.params.id;
        const merchantName = req.params.name;
        const merchant = req.body;
        if (merchantId) {
            const existingMerchantId = await merchantServiceModel.findMerchantById(req.body.id);
            if (!existingMerchantId) {
                res.status(400).send('merchant not found');
            }
            else {
                merchantServiceModel.updateMerchantById(merchantId, merchant)
                    .then(() => {
                        res.status(201).json(merchant);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            }
        }
        else if (merchantName) {
            const existingMerchantName = await merchantServiceModel.findMerchantByName(req.body.name);
            if (!existingMerchantName) {
                res.status(400).send('merchant not found');
            }
            else {
                merchantServiceModel.updateMerchantByName(merchantName, merchant)
                    .then(() => {
                        res.status(201).json(merchant);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            }
        }
    }
    static async deleteMerchant(req, res) {
        const merchantId = req.params.id;
        const merchantName = req.params.name;
        if (merchantId) {
            const existingMerchantId = await merchantServiceModel.findMerchantById(merchantId);
            if (!existingMerchantId) {
                res.status(400).send('merchant not found');
            }
            else {
                merchantServiceModel.deleteMerchantById(merchantId)
                    .then(() => {
                        res.status(204).send('merchant user deleted');
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            }
        }
        else if (merchantName) {
            const existingMerchantName = await merchantServiceModel.findMerchantByName(merchantName);
            if (!existingMerchantName) {
                res.status(400).send('merchant not found');
            }
            else {
                merchantServiceModel.deleteMerchantByName(merchantName)
                    .then(() => {
                        res.status(204).send('merchant user deleted');
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            }
        }
    }
    static async loginMerchant(req, res) {
        const userData = req.body;
        const merchantName = await merchantServiceModel.findMerchantByName(userData.name);
        const merchantEmail = await merchantServiceModel.findMerchantByEmail(userData.email);
        if (merchantName) {
            if (merchantName.password === userData.password) {
                const token = jwt.sign({
                    name: merchantName.name
                }, 'secret');
                res.status(200).json({ token });
            }
            else {
                res.status(401).json({ message: 'password is incorrect!' });
            }
        }
        else if (merchantEmail) {
            if (merchantEmail.password === userData.password) {
                const token = jwt.sign({
                    name: merchantEmail.name
                }, 'secret');
                res.status(200).json({ token });
            }
            else {
                res.status(401).json({ message: 'password is incorrect!' });
            }
        }
        else {
            res.status(401).json({ message: 'username or email does not exist!' });
        }
    }
}

module.exports = controllerMerchants;