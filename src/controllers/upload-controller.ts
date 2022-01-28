const fs = require('fs')
const util = require('util')
const {nanoid} = require("nanoid")
const {pipeline} = require('stream')
const pump = util.promisify(pipeline)
import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify"


async function routes(fastify: FastifyInstance, options: any) {
    fastify.post('/upload-template', async (req: FastifyRequest, reply: FastifyReply) => {
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
    });
}

module.exports = routes