import { Router } from "express";
import { AutenticacaoController } from "../controller/AutenticacaoController";
import { basicAuth } from "../middlewares/basics-auth";

const router = Router();
const autenticacaoController = new AutenticacaoController();

// Aplicando o middleware basicAuth a todos os endpoints desta rota
router.post("/full/login", basicAuth, autenticacaoController.login);

export default router;
