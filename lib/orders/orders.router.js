var express = require('express');
const orderDao = require("./orders.dao");
const Order = require("./orders.model").Order;

var router = express.Router();

router.get('/:id', async (req, res) => {

    const {id} = req.params;

    const userId = req.session.id;

    const order = await orderDao.getOrder({id, userId}).catch(err => {

        console.error(err);
        return {status: false};
    });

    if (order && order.status === 'complete') {

        res.sendFile(path.join(__dirname, 'public', 'ttt.html'));
    } else {

        res.redirect('/');
    }

});


router.post('/:id/:userId', async (req, res, next) => {


    const {id, userId} = req.params;

    const order = Object.assign({}, req.body, {id, userId});

    await orderDao.upsert(order).catch(err => {
        console.error(err);
        return false;
    });

    res.sendStatus(200);
});


module.exports = router;
