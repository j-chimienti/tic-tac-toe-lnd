var {Order} = require('./order.model');

var express = require('express');
const orderController = require("./order.controller");

var router = express.Router();

router.get('/:id', async (req, res) => {

    const {id} = req.params;

    const userId = req.session.id;

    const order = await orderController.getOrder({id, userId}).catch(err => {

        console.error(err);
        return {status: false};
    });

    if (order && order.status && order.status === 'complete') {

        res.sendFile(path.join(__dirname, 'public', 'ttt.html'));
    } else {

        res.redirect('/');
    }

});


router.post('/:id/:userId', async (req, res, next) => {


    const {id, userId} = req.params;

    const order = new Order(Object.assign({}, req.body, {id, userId}));

    await orderController.upsert(order).catch(err => {
        console.error(err);
        return false;
    });

    res.sendStatus(200);
});




module.exports = router;
