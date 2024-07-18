import express from 'express';
import DB from "./db";
import server from "./server";

async function main(): Promise<void> {
  await DB.initialize();

  const app = express();

  // Inicie o servidor
  server.start();
}

main();
