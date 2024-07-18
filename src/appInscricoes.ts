import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3002;
const baseURL = 'http://localhost:3000/full';

// Middleware para analisar o corpo da requisição JSON
app.use(express.json());

// Configuração dos headers de autenticação
const authHeaders = {
  headers: {
    username: 'FULLadmin',
    password: 'FULLadmin'
  }
};

// Middleware de autenticação para a API
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.headers;
  if (username === 'admin' && password === 'admin') {
    next();
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
};

// Use o middleware de autenticação em todas as rotas
app.use(authenticate);

// Rota para listar todas as inscrições
app.get('/inscricoes', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${baseURL}/inscricoes`, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota para buscar uma inscrição específica pelo ID
app.get('/inscricoes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${baseURL}/inscricoes/${id}`, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota para criar uma nova inscrição
app.post('/inscricoes', async (req: Request, res: Response) => {
  try {
    const inscricaoData = req.body;
    const response = await axios.post(`${baseURL}/inscricoes`, inscricaoData, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota para atualizar uma inscrição existente pelo ID
app.put('/inscricoes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const inscricaoData = req.body;
    const response = await axios.put(`${baseURL}/inscricoes/${id}`, inscricaoData, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota para deletar uma inscrição pelo ID
app.delete('/inscricoes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`${baseURL}/inscricoes/${id}`, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Função para lidar com erros
function handleError(error: unknown, res: Response) {
  if (error instanceof Error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: error.message });
  } else {
    console.error('Erro desconhecido:', error);
    res.status(500).json({ error: 'Erro desconhecido' });
  }
}

app.listen(PORT, () => {
  console.log(`API Inscricoes rodando na porta: ${PORT}`);
});
