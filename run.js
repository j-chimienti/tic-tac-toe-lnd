const app = require('./app');
const mongoConnect = require('mongo.connect');

const dbName = 'registration';

async function main() {
    const client = await mongoConnect();
    console.log("Connected successfully to server");

    global.db = client.db(dbName);
}

main();
