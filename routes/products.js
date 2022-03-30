const router = require('express').Router();
const controllerProducts= require('../controllers/products.js');
const fs = require('fs');

router.get('/', controllerProducts.getAllProducts);
router.get('/:productName', controllerProducts.getProductByName);