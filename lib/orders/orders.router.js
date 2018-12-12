var express = require('express');
const orderDao = require("./orders.dao");
const uuid = require("uuid");
// todo use
// const Order = require("./orders.model").Order;
var router = express.Router();

router.get('/:id', async (req, res) => {

    const {id} = req.params;

    const userId = req.session.id;

    const order = await orderDao.getOrder({id, userId}).catch(err => {

        console.error(err);
        return {status: false};
    });

    if (order && order.status === 'complete' && order.userId === userId) {

        res.sendFile(path.join(__dirname, 'public', 'ttt.html'));

    } else {

        res.redirect('/');
    }

});

router.post('/:id/:userId', async (req, res) => {


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
router.get('/homepage/check/status', async (req, res) => {

    const {id} = req.session;

    // ttl
    const order = await orderDao.findByUserId(id).catch(err => {

        console.error(err);

        return false;
    });


    if (order && order.status) {

        res.render('order' , { order })

    } else {

        const orderId = uuid.v1();
        res.locals.userId = req.session.id;
        res.locals.orderId = orderId;
        res.render('index');

    }
});

module.exports = router;
