import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { searchRoutes } from "./routes/searchRoutes";

const fastify = Fastify({ logger: true });

// Configuração de CORS
fastify.register(cors);

// Configuração da documentação Swagger
fastify.register(swagger, {
  openapi: {
    info: {
      title: "MultiSearch API",
      description: "API para busca de dados nos arquivos JSON",
      version: "1.0.0",
    },
  },
});

fastify.register(swaggerUi, {
  routePrefix: "/api-docs",
});

// Registrando rotas
fastify.register(searchRoutes);

// Iniciando o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running on http://localhost:3000");
    console.log("📚 Swagger docs available at http://localhost:3000/api-docs");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
