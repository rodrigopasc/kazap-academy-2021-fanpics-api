const Database = require('./Database')

class Post extends Database {
    constructor(params = {}) {
        super()
        this.collection = 'posts'
    }
}

module.exports = Post