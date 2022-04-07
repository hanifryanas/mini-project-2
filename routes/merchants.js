const router = require('express').Router();
const controllerMerchants = require('../controllers/merchants.js');
const Middleware = require('../middleware/checkAuth.js');

router.get('/id/:id', controllerMerchants.getMerchantById);
router.get('/name/:name', controllerMerchants.getMerchantByName);
router.post('/', controllerMerchants.createMerchant);
router.post('/login', controllerMerchants.loginMerchant);
router.put('/id/:id', Middleware.checkAuth, controllerMerchants.updateMerchant);
router.delete('/id/:id', Middleware.checkAuth, controllerMerchants.deleteMerchant);

module.exports = router;