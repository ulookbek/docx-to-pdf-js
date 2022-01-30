import {FastifyInstance} from "fastify"
import uploadTemplateController from "./upload-controller"
import convertController from "./convert-controller"
import ping from "./ping";

async function routes(fastify: FastifyInstance) {
    fastify.get('/ping', ping);
    fastify.post('/upload-template', uploadTemplateController);
    fastify.post('/download-converted', convertController);
}

export default routes