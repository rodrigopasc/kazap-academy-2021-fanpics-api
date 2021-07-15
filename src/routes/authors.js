const router = require('express').Router()
const { authors } = require('../controllers')

router.get('/', authors.list)
router.post('/', authors.create)
router.get('/:id', authors.show)
router.patch('/:id', authors.update)
router.delete('/:id', authors.destroy)

module.exports = router