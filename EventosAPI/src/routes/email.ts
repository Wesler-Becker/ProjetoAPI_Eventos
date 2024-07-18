import { Router } from "express";
import { EmailController } from "../controller/EmailController";
import { basicAuth } from "../middlewares/basics-auth"; // Importando o middleware

const router = Router();
const emailController = new EmailController();

router.post("/full/email/:id", basicAuth, emailController.enviarEmail);

export default router;
