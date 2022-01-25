const config = require('./config')
const fastify = require('fastify')()


const fs = require('fs')
const util = require('util')
const path = require('path')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)


fastify.register(require('fastify-multipart'))
fastify.register(require("./controllers/upload-controller"))

const start = async () => {
    try {
        await fastify.listen(config.port)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start().then(() => {
    console.log("Server started at localhost:5000")
}).catch(console.log)