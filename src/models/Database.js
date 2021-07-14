const MongoDB = require('mongodb')
const secrets = require('../../secrets.json')

const MongoClient = MongoDB.MongoClient
const MongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

class Database {
    constructor() {
        this.collection = ''
    }

    async _getMongoClientAndCollection() {
        const MongoURI = secrets.mongoURI

        const client = await MongoClient.connect(MongoURI, MongoOptions)
        const database = client.db()
        const collection = database.collection(this.collection)

        return { client, collection }
    }

    async insertOne(objectToInsert) {
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            const document = await collection.insertOne(objectToInsert)

            client.close()

            return document
        } catch (error) {
            throw new Error(error)
        }
    }

    async list(params = {}, sort = {}) {
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            const documents = await collection.find(params).sort(sort).toArray()

            client.close()

            return documents
        } catch(error) {
            throw new Error(error)
        }
    }
}

module.exports = Database