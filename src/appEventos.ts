import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3001;
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

// Rota para listar todos os eventos
app.get('/eventos', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${baseURL}/eventos`, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota para buscar um evento específico pelo ID
app.get('/eventos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${baseURL}/eventos/${id}`, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota para criar um novo evento
app.post('/eventos', async (req: Request, res: Response) => {
  try {
    const eventoData = req.body;
    const response = await axios.post(`${baseURL}/eventos`, eventoData, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota para atualizar um evento existente pelo ID
app.put('/eventos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eventoData = req.body;
    const response = await axios.put(`${baseURL}/eventos/${id}`, eventoData, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota para deletar um evento pelo ID
app.delete('/eventos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`${baseURL}/eventos/${id}`, authHeaders);
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
  console.log(`API Eventos rodando na porta: ${PORT}`);
});
