import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3003;
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

// Rotas de Usuários
app.get('/usuarios', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${baseURL}/usuarios`, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

app.get('/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${baseURL}/usuarios/${id}`, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

app.post('/usuarios', async (req: Request, res: Response) => {
  try {
    const usuarioData = req.body;
    const response = await axios.post(`${baseURL}/usuarios`, usuarioData, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

app.put('/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuarioData = req.body;
    const response = await axios.put(`${baseURL}/usuarios/${id}`, usuarioData, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

app.delete('/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`${baseURL}/usuarios/${id}`, authHeaders);
    res.json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

// Rota de Autenticação
app.post('/login', async (req: Request, res: Response) => {
  try {
    const loginData = req.body;
    const response = await axios.post(`${baseURL}/login`, loginData, authHeaders);
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
  console.log(`API Usuarios rodando na porta: ${PORT}`);
});
