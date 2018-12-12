async function createUniqueIndex(collection, field = 'id') {

    return new Promise((resolve, reject) => {
        collection.createIndex(
            {[field]: 1},
            {unique: true}
            , (err, indexName) => {
                if (err) return reject(err)
                else return resolve(indexName)
            })
    })

}

module.exports = {
    createUniqueIndex
};
