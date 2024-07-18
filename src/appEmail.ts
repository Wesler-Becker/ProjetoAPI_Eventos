import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3004;
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

// Rota para enviar e-mail
app.post('/email/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const emailData = req.body;
        const response = await axios.post(`${baseURL}/email/${id}`, emailData, authHeaders);
        res.json(response.data);
    } catch (error: unknown) {
        handleError(error, res);
    }
});

// Função para lidar com erros
function handleError(error: unknown, res: Response) {
    if (axios.isAxiosError(error)) {
        console.error('Erro ao chamar o serviço de e-mail:', error.response?.data);
        res.status(error.response?.status || 500).json({ error: error.response?.data });
    } else if (error instanceof Error) {
        console.error('Erro:', error.message);
        res.status(500).json({ error: error.message });
    } else {
        console.error('Erro desconhecido:', error);
        res.status(500).json({ error: 'Erro desconhecido' });
    }
}

app.listen(PORT, () => {
    console.log(`API E-mails rodando na porta: ${PORT}`);
});
