const router = require('express').Router()
const { posts } = require('../controllers')

router.get('/', posts.list)
router.post('/', posts.create)
router.get('/:id', posts.show)
router.patch('/:id', posts.update)
router.delete('/:id', posts.destroy)

module.exports = router