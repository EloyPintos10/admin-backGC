import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers";
import {check} from "express-validator";


const router = Router();



router
  .route("/productos")
  .get(listarProductos)
  .post(
    [
       check("name", "El nombre del producto es obligatorio")
        .notEmpty()
        .isLength({ min: 2, max: 50 })
        .withMessage("El producto debe tener entre 2 y 50 caracteres"),
      check("price", "El precio del producto es obligatorio")
        .notEmpty()
        .isNumeric()
        .withMessage("El precio debe ser numerico")
        .custom((value) => {
          if (value >= 1 && value <= 50000) {
            return true;
          } else {
            throw new Error("El precio debe estar entre 1 y  50000");
          }
        }),
      check("image")
       .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage("Debe enviar una URL valida"),
        check("descripcion", "La descripción del producto es obligatoria")
        .notEmpty()
        .isLength({ min: 10, max: 300 })
        .withMessage("La descripción debe tener entre 10 y 300 caracteres"),
      check("category")
        .isIn(["Celular"])
        .withMessage("La categoria debe ser valida"),
      check("quantity")
        .isNumeric()
        .withMessage("La cantidad debe ser valida"),
    ],
    crearProducto
  );

router
router
.route("/productos/:id")
.get(obtenerProducto)
.put(editarProducto)
.delete( borrarProducto);

export default router;
