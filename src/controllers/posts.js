const httpStatus = require('http-status')
const { Post } = require('../models')
const { safeObjectId } = require('../helpers')

const methods = {
    async list(request, response) {
        const post = new Post()

        try {
            const posts = await post.aggregate([
                { $match: { deletedAt: { $exists: false } } },
                {
                    $lookup: {
                        from: 'authors',
                        localField: 'authorId',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
                { $unwind: '$author' }
            ], { createdAt: -1 })

            response.status(httpStatus.OK).json(posts)
        } catch(error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async create(request, response) {
        const { title, url, authorId, description } = request.body

        const post = new Post()

        if (!title || !url) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'The fields "title" and "url" are both required.' })
        }

        try {
            const insertedObject = await post.insertOne({ title, url, authorId: safeObjectId(authorId), description, createdAt: Date.now(), updatedAt: Date.now() })

            response.status(httpStatus.CREATED).json(insertedObject)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async show(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)

        const post = new Post()

        try {
            const postToReturn = await post.findOne({  _id: convertedObjectId  })
            
            response.status(httpStatus.OK).json(postToReturn)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async update(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)
        const { title, url, authorId, description } = request.body

        if (!title || !url) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'The fields "title" and "url" are both required.' })
        }

        const post = new Post()

        try {
            const updatedObject = await post.updateOne({ _id: convertedObjectId }, { title, url, authorId: safeObjectId(authorId), description, updatedAt: Date.now() })
            
            response.status(httpStatus.OK).json(updatedObject)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async destroy(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)

        const post = new Post()

        try {
            const destroyedObject = await post.updateOne({ _id: convertedObjectId }, { deletedAt: Date.now() })
            
            response.status(httpStatus.NO_CONTENT).json()
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}

module.exports = methods