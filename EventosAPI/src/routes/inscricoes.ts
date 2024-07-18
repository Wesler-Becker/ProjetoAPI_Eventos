import { Router } from "express";
import { InscricoesController } from "../controller/InscricoesController";
import { basicAuth } from "../middlewares/basics-auth"; // Importando o middleware

const router = Router();
const inscricoesController = new InscricoesController();

router.get("/full/inscricoes", basicAuth, inscricoesController.list);
router.get("/full/inscricoes/:id", basicAuth, inscricoesController.find);
router.post("/full/inscricoes", basicAuth, inscricoesController.create);
router.put("/full/inscricoes/:id", basicAuth, inscricoesController.update);
router.delete("/full/inscricoes/:id", basicAuth, inscricoesController.delete);

export default router;
