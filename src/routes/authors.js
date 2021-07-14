const router = require('express').Router()
const { authors } = require('../controllers')

router.get('/', authors.list)

module.exports = router