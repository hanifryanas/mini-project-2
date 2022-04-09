const router = require('express').Router();
const controllerMerchants = require('../controllers/merchants.js');
const Middleware = require('../middleware/checkAuth.js');

router.get('/id/:id', controllerMerchants.getMerchantById);
router.get('/name/:name', controllerMerchants.getMerchantByName);
router.get('/admin', Middleware.checkAdmin, controllerMerchants.getAllMerchants);
router.get('/admin/products', Middleware.checkAdmin, controllerMerchants.getAllMerchantsProducts);
router.post('/', controllerMerchants.createMerchant);
router.post('/login', controllerMerchants.loginMerchant);
router.put('/id/:id', Middleware.checkAuth, controllerMerchants.updateMerchant);
router.put('/name/:name', Middleware.checkAuth, controllerMerchants.updateMerchant);
router.delete('/id/:id', Middleware.checkAuth, controllerMerchants.deleteMerchant);
router.delete('/name/:name', Middleware.checkAuth, controllerMerchants.deleteMerchant);

module.exports = router;