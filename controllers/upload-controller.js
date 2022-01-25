const fs = require('fs')
const util = require('util')
const {pipeline} = require('stream')
const pump = util.promisify(pipeline)

async function routes(fastify, options) {
    fastify.post('/upload-template', async (req, reply) => {
        try {
            const data = await req.file()
            await pump(data.file, fs.createWriteStream(data.filename))
            reply.send()
        } catch (e) {
            console.log("error: ", e)
        }
    })
}

module.exports = routes