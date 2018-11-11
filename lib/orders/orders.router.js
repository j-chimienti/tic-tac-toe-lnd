var express = require('express');
const orderDao = require("./orders.dao");
const Order = require("./orders.model").Order;
var router = express.Router();
router.post('/:id/:userId', async (req, res, next) => {


    const {id, userId} = req.params;

    // todo: use Order model
    const order = new Order(Object.assign({}, req.body, {id, userId}));

    await orderDao.upsert(order).catch(err => {
        console.error(err);
        return false;
    });

    res.sendStatus(200);
});


module.exports = router;
