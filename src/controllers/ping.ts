import {FastifyRequest, FastifyReply} from "fastify"

async function ping(req: FastifyRequest, reply: FastifyReply) {
    return reply.send("pong")
}

export default ping