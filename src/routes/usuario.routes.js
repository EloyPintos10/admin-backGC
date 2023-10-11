import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, login, listarUsuarios, obtenerUsuarios, borrarUsuarios } from "../controllers/usuarios.controllers";




const router = Router();


router
  .route("/")
  .post(
    [
      check("email", "El email es obligatorio").isEmail(),
      check(
        "password",
        "El password debe contener 8 caracteres como minimo"
      ).isLength({ min: 8 }),
      
    ],
    login
  );
router
  .route("/nuevo")
  .get(listarUsuarios)
  .post(
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("apellido", "El apellido es obligatorio").not().isEmpty(),
      check("userName", "El nombre de usuario es obligatorio").not().isEmpty(),
      check("email", "El email es obligatorio").isEmail(),
      check("perfil", "El perfil es obligatorio"),
      check("password", "El password debe de ser de 8 caracteres").isLength({
        min: 8,
      }),
     
      
    ],
    
    crearUsuario
  );

  router
  .route("/nuevo/:id")
  .get(obtenerUsuarios)  
  .delete(borrarUsuarios);


export default router;