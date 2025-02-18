import { FastifyInstance } from "fastify";
import { searchController } from "../controllers/searchController";

export async function searchRoutes(app: FastifyInstance) {
  console.log("📌 Registrando rota /search");

  app.get("/search", searchController);
}
