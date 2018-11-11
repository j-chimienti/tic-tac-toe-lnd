module.exports = {
    insert: async (order) => {
        return await global.db
            .collection('orders')
            .insertOne(order);
    },
    findByUserId: async (userId) => {
        return await global.db
            .collection('orders')
            .findOne({userId})
    },
    getOrder: async ({id, userId}) => {

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
            .update({id: order.id}, order, {upsert: true});
    }
};
