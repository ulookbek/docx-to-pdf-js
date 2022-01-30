const fs = require('fs')
const util = require('util')
const {pipeline} = require('stream')
import {FastifyRequest, FastifyReply} from "fastify"
const pump = util.promisify(pipeline)

async function uploadTemplateController(req: FastifyRequest, reply: FastifyReply) {
    const parts = req.parts()
    try {
        for await (const part of parts) {
            if (part.file && part.fieldname === "file") {
                if (part.filename.includes(".docx")) {
                    console.log("4")
                } else {
                    reply.send({error: "Шаблон должен быть в формате Word"})
                }
                await pump(part.file, fs.createWriteStream(`./templates/${part.filename}`))
                reply.send({success: "true", file_path: `/templates/${part.filename}`})
            } else {
                reply.send({success: "false", message: "Прикрепите файл"})
            }
        }
    } catch (e) {
        console.error("error: ", e)
        reply.send({success: "false", message: "Прикрепите файл 1"})
    }
    reply.send({success: "false", message: "Прикрепите файл 2"})

}

export default uploadTemplateController