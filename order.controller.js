module.exports = {
    insert: async (order) => {
        return await global.db
            .collection('orders')
            .insertOne(order);
    },
    getOrder: async (id) => {

        return await global.db
            .collection('orders')
            .findOne({id})
    },
    update: async (order) => {

        return await global.db
            .collection('orders')
            .updateOne(order);
    },
    upsert: async (order) => {

        return await global.db
            .collection('orders')
            .updateOne({id: order.id}, order, {upsert: true});
    }
};
