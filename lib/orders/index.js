const dao = require('./orders.dao');

const {Order} = require('./orders.model');

module.exports = {
    router: require('./orders.router'),
    controller: dao,
    dao,
    Order,
};
