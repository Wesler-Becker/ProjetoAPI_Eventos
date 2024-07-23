import express from 'express';
import DB from "./db";
import server from "./server";

async function main(): Promise<void> {
  try {
    await DB.initialize();

    const app = express();

    // Inicie o servidor
    server.start();

    console.log("Aplicação iniciada com sucesso!");
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
  }
}

main();
