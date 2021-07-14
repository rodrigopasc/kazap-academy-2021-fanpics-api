const router = require('express').Router()
const { posts } = require('../controllers')

router.get('/', posts.list)

module.exports = router