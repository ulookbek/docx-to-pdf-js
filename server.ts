import fastify from "fastify"
import fastifyMultipart from "fastify-multipart"
import "fastify-multipart"
import config from "./src/config"
import controllers from "./src/controllers"

const server = fastify()


server.register(fastifyMultipart, {})
server.register(controllers, {prefix: "/v1"})

const start = async () => {
    try {
        await server.listen(config.port)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start().then(() => {
    global.console.info("Server started at localhost:5000")
}).catch(console.log)