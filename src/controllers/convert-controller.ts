const fs = require('fs')
const util = require('util')
import path from "path"
import {nanoid} from "nanoid"

const {pipeline} = require('stream')
import {FastifyRequest, FastifyReply} from "fastify"

const pump = util.promisify(pipeline)
import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"

interface IBody {
    file_path: string,
    content: object
}

async function convertController(req: FastifyRequest<{Body: IBody}>, reply: FastifyReply) {
    // const parts = req.parts()
    // await req.file({limits: {fileSize: 1000000}})
    // try {
    //     for await (const part of parts) {
    //         if (part.file && part.fieldname === "file") {
    //             if (part.filename.includes(".docx")) {
    //             } else {
    //                 reply.send({error: "Шаблон должен быть в формате Word"})
    //             }
    //             await pump(part.file, fs.createWriteStream(`./templates/${part.filename}`))
    //             reply.send({success: "Шаблон успешно загружен"})
    //         }
    //     }
    // } catch (e) {
    //     console.error("error: ", e)
    // }


    // Load the docx file as binary content
    const content = fs.readFileSync(
        path.resolve(process.cwd() + req.body.file_path),
        "binary"
    );
    //
    const zip = new PizZip(content);
    //
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    //
    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render(req.body.content);
    //
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });
    //
    // // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
    fs.writeFileSync(path.resolve(process.cwd() + "/rendered", `${nanoid()}.docx`), buf);

    // const {content} = req.body
    console.log("req.body: ", req.body.content)
    reply.send({success: "true"})
}


export default convertController