const express = require('express');

const router = express.Router();
const ordersCtrl = require('../controllers/orders');

router.route('/orders').post(ordersCtrl.create);
router.route('/orders/:order_id')
  .get(ordersCtrl.get);

module.exports = router;
