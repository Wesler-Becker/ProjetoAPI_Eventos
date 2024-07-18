import express, { Express } from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import usuariosRoutes from './routes/usuarios';
import autenticacaoRoutes from './routes/autenticacao';
import eventoRoutes from './routes/eventos';
import inscricoesRoutes from './routes/inscricoes';
import emailRoutes from './routes/email';
import { basicAuth } from "./middlewares/basics-auth";
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'eventos',
  password: 'postgres',
  port: 5432,
});

const app: Express = express();
const port: number = Number(process.env.server_port || 3000);

// Middleware para permitir solicitações de origens diferentes
app.use(cors());

// Middleware para analisar JSON bodies
app.use(express.json());

// Middleware para servir a documentação Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Criar a tabela se não existir
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    method VARCHAR(10) NOT NULL,
    url TEXT NOT NULL,
    body TEXT
  )
`;
pool.query(createTableQuery)
  .then(() => console.log("Tabela 'logs' criada com sucesso ou já existente."))
  .catch(err => console.error("Erro ao criar tabela 'logs':", err));

// Middleware para registrar logs no banco de dados
app.use((req, res, next) => {
  const { method, url, body } = req;
  const date = new Date();
  console.log(`[${date}] ${method} ${url} - Body:`, body);

// Middleware para servir a documentação Swagger UI
app.use('/docs', express.static('public'));

  // Insere o log no banco de dados
  const query = {
    text: 'INSERT INTO logs (date, method, url, body) VALUES ($1, $2, $3, $4)',
    values: [date, method, url, JSON.stringify(body)],
  };
  pool.query(query)
    .then(() => next())
    .catch((err) => {
      console.error('Erro ao inserir log no banco de dados:', err);
      next();
    });
});

// Rotas
app.use(basicAuth);
app.use(autenticacaoRoutes);
app.use(usuariosRoutes);
app.use(eventoRoutes);
app.use(inscricoesRoutes);
app.use(emailRoutes);

// Iniciar servidor

export default {
  start() {
    app.listen(port, () => {
      console.log(`API FULL rodando na porta: ${port}`);
    });
  },
};
