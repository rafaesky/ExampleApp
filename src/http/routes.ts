import { register } from "@/http/controllers/register.controller";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}