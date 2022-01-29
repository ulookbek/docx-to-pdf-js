const fs = require('fs')
const util = require('util')
const {nanoid} = require("nanoid")
const {pipeline} = require('stream')
const pump = util.promisify(pipeline)
import {FastifyRequest, FastifyReply} from "fastify"

async function uploadTemplateController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const data = await req.file()
        console.log(Object.keys(data))
        await pump(data.file, fs.createWriteStream("./uluk/" + nanoid()))
        reply.send()
    } catch (err) {
        console.log(`error: ${err}`)
    }
}

export default uploadTemplateController