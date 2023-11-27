import { Router } from "express";
import {
  crearPedido,
  listarPedidos,
  borrarPedido,
  editarPedido,
} from "../controllers/pedidos.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/pedidos")
  .get(listarPedidos)
  .post(
    [
      check("detallePedido", "El detalle del pedido es obligatorio").notEmpty(),
      check("montoTotal", "El monto es obligatorio")
        .notEmpty()
        .isNumeric()
        .withMessage("El monto debe ser numerico"),

      check("estado", "El estado del pedido es obligatoria").notEmpty(),
      check("direccion", "La direccion del pedido es obligatoria").notEmpty(),
    ],
    crearPedido
  );

router.route("/pedidos/:id").put(editarPedido).delete(borrarPedido);

export default router;
