const methods = {
    async list(request, response) {
        response.status(200).json({
            title: 'Autores!'
        })
    }
}

module.exports = methods