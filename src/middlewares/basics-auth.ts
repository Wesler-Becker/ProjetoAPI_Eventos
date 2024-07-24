import { Request, Response, NextFunction } from "express";
export async function basicAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  // Verificar se a rota é a rota de documentação
  if (req.originalUrl === '/docs') {
    return next(); // Se for a rota de documentação, prosseguir sem autenticação
  }

  const username = req.headers['username'];
  const password = req.headers['password'];

  if (username !== "FULLadmin" || password !== "FULLadmin") {
    return res.status(401).json({ mensagem: "Credenciais inválidasss" });
  }

  return next();
}
