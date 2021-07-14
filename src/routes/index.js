const router = require('express').Router()

const posts = require('./posts')
const authors = require('./authors')

router.use('/posts', posts)
router.use('/authors', authors)

module.exports = router