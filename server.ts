import fastify from "fastify"
import fastifyMultipart from "fastify-multipart"
import "fastify-multipart"
import config from "./src/config"



const server = fastify()


server.register(fastifyMultipart)
server.register(require("./src/controllers"))

const start = async () => {
    try {
        await server.listen(config.port)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start().then(() => {
    console.log("Server started at localhost:5000")
}).catch(console.log)