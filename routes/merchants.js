const router = require('express').Router();
const controllerMerchants = require('../controllers/merchants.js');

router.get('/:merchantId', controllerMerchants.getMerchantById);
router.get('/:merchantName', controllerMerchants.getMerchantByName);
router.post('/', controllerMerchants.createMerchant);
router.put('/:merchantId', controllerMerchants.updateMerchant);
router.delete('/:merchantId', controllerMerchants.deleteMerchant);

module.exports = router;