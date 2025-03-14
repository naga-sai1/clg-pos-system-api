const express = require('express');
const router = express.Router();
const { checkout, getAllOrders } = require('../controllers/orders.controller');

router.post('/checkout', checkout);
router.get('/get_all_orders', getAllOrders);

module.exports = router;
