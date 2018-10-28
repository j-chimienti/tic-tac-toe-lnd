const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_CONTAINER_NAME}/admin`;
const MongoClient = require('mongodb').MongoClient;


async function connect() {


    return await MongoClient.connect(url, {poolSize: 20, useNewUrlParser: true}).catch(err => {

        console.error('error connecting to server @', url);
        process.exit(1);
    });
}

module.exports = {
    connect,
};
