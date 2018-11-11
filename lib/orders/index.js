const dao = require('./orders.dao');

module.exports = {
    router: require('./orders.router'),
    controller: dao,
    dao,
    Order: require('./orders.model'),

};
