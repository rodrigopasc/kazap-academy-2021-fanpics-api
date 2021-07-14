const router = require('express').Router()
const { authors } = require('../controllers')

router.get('/', authors.list)
router.post('/', authors.create)

module.exports = router