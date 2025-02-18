import { FastifyRequest, FastifyReply } from "fastify";
import fs from "fs-extra";
import path from "path";
import _ from "lodash";

// Função para carregar arquivos JSON
const loadData = (): Record<string, any[]> => {
  return {
    workforce: fs.readJsonSync(path.join(__dirname, "../data/workforce.json")),
    sales_orders: fs.readJsonSync(path.join(__dirname, "../data/sales_orders.json")),
    purchase_orders: fs.readJsonSync(path.join(__dirname, "../data/purchase_orders.json")),
    materials: fs.readJsonSync(path.join(__dirname, "../data/materials.json")),
    equipments: fs.readJsonSync(path.join(__dirname, "../data/equipments.json")),
  };
};

// Normaliza o texto (removendo acentos e convertendo para minúsculas)
const normalizeText = (text: string): string => {
  return _.deburr(text.toLowerCase());
};

// Função de busca genérica
const searchInData = (query: string, data: any[]): any[] => {
  const results: any[] = [];
  const normalizedQuery = normalizeText(query);

  data.forEach((item) => {
    const values = Object.values(item).map((value) => normalizeText(String(value)));
    if (values.some((value) => value.includes(normalizedQuery))) {
      results.push(item);
    }
  });

  return results;
};

// Controlador da busca para Fastify
export const searchController = async (
  request: FastifyRequest<{ Querystring: { query: string } }>,
  reply: FastifyReply
) => {
  console.log("📌 Rota /search foi chamada");

  const { query } = request.query;
  
  if (!query || typeof query !== "string") {
    return reply.status(400).send({ error: "O parâmetro 'query' é obrigatório e deve ser uma string." });
  }
  
  const data = loadData();
  console.log(">> ", data);

  const results = {
    workforce: searchInData(query, data.workforce),
    sales_orders: searchInData(query, data.sales_orders),
    purchase_orders: searchInData(query, data.purchase_orders),
    materials: searchInData(query, data.materials),
    equipments: searchInData(query, data.equipments),
  };

  return reply.send(results);
};
