import { Router } from "express";
import { EventosController } from "../controller/EventosController";
import { basicAuth } from "../middlewares/basics-auth"; // Importando o middleware

const router = Router();
const eventoController = new EventosController();

router.get("/full/eventos", basicAuth, eventoController.list);
router.get("/full/eventos/:id", basicAuth, eventoController.find);
router.post("/full/eventos", basicAuth, eventoController.create);
router.put("/full/eventos/:id", basicAuth, eventoController.update);
router.delete("/full/eventos/:id", basicAuth, eventoController.delete);

export default router;
