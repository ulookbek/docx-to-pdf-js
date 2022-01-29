import {FastifyInstance} from "fastify"
import uploadTemplateController from "./upload-controller"
import ping from "./ping";

async function routes(fastify: FastifyInstance) {
    fastify.get('/ping', ping);
    fastify.get('/upload-template', uploadTemplateController);
}

module.exports = routes