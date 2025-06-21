const express = require('express');
const router = express.Router();
const { getCandles, getCandleById } = require('../controllers/candleController');

router.get('/', getCandles);

router.get('/:id', getCandleById);

module.exports = router;