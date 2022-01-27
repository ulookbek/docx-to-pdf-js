const fs = require('fs')
const util = require('util')
const {nanoid} = require("nanoid")
const {pipeline} = require('stream')
const pump = util.promisify(pipeline)

async function routes(fastify, options) {
    fastify.post('/upload-template', async (req, reply) => {
        try {
            const data = await req.file()
            console.log(Object.keys(data))
            // console.log("fields: ", Object.keys(req.))
            // Object.keys(req).forEach((key) => {
            //     console.log(key + " ", req[key], "\n")
            // })
            await pump(data.file, fs.createWriteStream("./uluk/" + nanoid()))
            reply.send()
        } catch (e) {
            console.log("error: ", e)
        }
    })
}

module.exports = routes