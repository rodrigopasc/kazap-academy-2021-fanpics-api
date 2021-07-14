const Database = require('./Database')

class Author extends Database {
    constructor(params = {}) {
        super()
        this.collection = 'authors'
    }
}

module.exports = Author