const app = require('./src/app')
const secrets = require('./secrets.json')

app.listen(secrets.port, () => {
    console.log(`Server is up and running on http://localhost:${secrets.port} - enjoy!`)
})