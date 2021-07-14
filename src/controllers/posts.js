const methods = {
    async list(request, response) {
        response.status(200).json({
            title: 'Kazap Academy 2021 - funcionou!'
        })
    }
}

module.exports = methods