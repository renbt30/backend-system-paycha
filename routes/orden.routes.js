import { Router } from "express";
import * as orden from "../controllers/orden.controller.js";
import * as auth from "../middlewares/authenticate.js"
import passport from "passport";

const router = Router();

router.post("/crear", auth.auth, orden.createOrden);
router.get("/buscar/porestado/:estado", auth.auth, orden.findByStatus);
router.get("/buscar/porestado/fecha/:estado", auth.auth, orden.findByStatusAndDate);
router.get("/buscar/porestado/reciente/:estado", auth.auth, orden.findWithRecentDateByStatus);
router.get("/buscar/porid/:id", auth.auth, orden.findById);
router.get("/buscar/porcliente/:id", auth.auth, orden.findWithRecentDateByCliente);
router.get("/buscar/porclienteestado/:id/:estado", auth.auth, orden.findByClienteStatus);

//router.get("/listar", orden.listarCategoria);
router.get("/buscar/porestadotodelivery/:estado", orden.findByStatusToDelivery);
router.get("/buscar/porestadococina/:estado", auth.auth, orden.findByStatusCocina);
router.get("/historialordenes/:fecha_inicio/:fecha_fin", auth.auth, orden.historialOrdenes);
router.get("/historialfechasanio/:anio/:mes", auth.auth, orden.historialOrdenes);

router.put("/inserttiempo/:id", auth.auth, orden.insertTiempoEntrega);
router.put("/update/estado/:id", auth.auth, orden.actualizarEstadoOrden);
router.put("/cancelarorden/:id", auth.auth, orden.cancelarOrden);
router.post("/deleteorden/:id", auth.auth, orden.deleteOrden);

//router.put("/update/estadococina/:id", orden.actualizarEstadoOrden);


export default router;