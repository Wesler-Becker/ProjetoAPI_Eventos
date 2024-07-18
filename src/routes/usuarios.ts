import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { basicAuth } from "../middlewares/basics-auth";

const router = Router();
const usuarioController = new UsuarioController();

router.get("/full/usuarios", basicAuth, usuarioController.list);
router.get("/full/usuarios/:id", basicAuth, usuarioController.find);
router.post("/full/usuarios", basicAuth, usuarioController.create);
router.put("/full/usuarios/:id", basicAuth, usuarioController.update);
router.delete("/full/usuarios/:id", basicAuth, usuarioController.delete);

export default router;
