var express = require('express');
const orderDao = require("./orders.dao");
const Order = require("./orders.model").Order;
var router = express.Router();
router.post('/:id/:userId', async (req, res, next) => {


    const {id, userId} = req.params;

    const {
        expirationTime,
        invoiceTime,
        currentTime,
        url,
        posData,
        status,
        btcPrice,
        price,
        currency,
        btcPaid,
        btcDue,
        rate,
        exceptionStatus,
        buyerFields,
        transactionCurrency,
        paymentSubtotals,
        paymentTotals,
        amountPaid,
        exchangeRates,
    } = req.body;

    const order = {
        id,
        userId,
        expirationTime: new Date(expirationTime),
        invoiceTime: new Date(invoiceTime),
        currentTime: new Date(currentTime),
        url,
        posData,
        status,
        btcPrice,
        price,
        currency,
        btcPaid,
        btcDue,
        rate,
        exceptionStatus,
        buyerFields,
        transactionCurrency,
        paymentSubtotals,
        paymentTotals,
        amountPaid,
        exchangeRates,
    };

    await orderDao.upsert(order).catch(err => {
        console.error(err);
        return false;
    });

    res.sendStatus(200);
});


module.exports = router;
