const router = require('express').Router();
const controllerMerchants = require('../controllers/merchants.js');
const Middleware = require('../middleware/checkAuth.js');

router.get('/:merchantId', controllerMerchants.getMerchantById);
router.get('/:merchantName', controllerMerchants.getMerchantByName);
router.post('/', controllerMerchants.createMerchant);
router.put('/:merchantId', Middleware.checkAuth, controllerMerchants.updateMerchant);
router.delete('/:merchantId', Middleware.checkAuth, controllerMerchants.deleteMerchant);

module.exports = router;