const router = require('express').Router();
const controllerProducts= require('../controllers/products.js');
const fs = require('fs');
const Middleware = require('../middleware/checkAuth.js');

router.get('/', controllerProducts.getAllProducts);
router.get('/:productName', controllerProducts.getProductByName);
router.post('/', Middleware.checkAuth, controllerProducts.createProduct);
router.put('/:productId', Middleware.checkAuth, controllerProducts.updateProduct);
router.delete('/:productId', Middleware.checkAuth, controllerProducts.deleteProduct);

module.exports = router;