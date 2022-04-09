const router = require('express').Router();
const controllerProducts = require('../controllers/products.js');
const Middleware = require('../middleware/checkAuth.js');

router.get('/:id/products', controllerProducts.getAllProducts);
router.get('/:id/products/:productId', controllerProducts.getProductById);
router.get('/:id/products/name/:productName', controllerProducts.getProductByName);
router.post('/:id/products', Middleware.checkAuth, controllerProducts.createProduct);
router.put('/:id/products/:productId', Middleware.checkAuth, controllerProducts.updateProduct);
router.put('/:id/products/name/:productName', Middleware.checkAuth, controllerProducts.updateProduct);
router.delete('/:id/products/:productId', Middleware.checkAuth, controllerProducts.deleteProduct);
router.delete('/:id/products/name/:productName', Middleware.checkAuth, controllerProducts.deleteProduct);

module.exports = router;