const router = require('express').Router();
const controllerMerchants = require('../controllers/merchants.js');
const fs = require('fs');

router.get('/:merchantName', controllerMerchants.getMerchantByName);