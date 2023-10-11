import Usuario from "../models/usuarios";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/jwt";

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        mensaje: "Correo o password invalido - correo",
      });
    }

    const passwordValido = bcrypt.compareSync(password, usuario.password);

    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Correo o password invalido - password",
      });
    }

    const token = await generarJWT(usuario._id, usuario.nombre);

    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id,
      nombre: usuario.nombre,
      perfil: usuario.perfil,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      mensaje: "usuario o contraseña invalido",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }

    usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
   
    const token = await generarJWT(usuario._id, usuario.nombre);

    res.status(201).json({
      mensaje: "usuario creado",
      uid: usuario._id,
      nombre: usuario.nombre,
      perfil: usuario.perfil,
      token,
    });
   


   
  } catch (error) {
    console.error(error);
    res.status(400).json({
      mensaje: "El usuario no pudo ser creado",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const Usuarios = await Usuario.find();
    res.status(200).json(Usuarios);
  } catch (error) {
    res.status(404).json({ mensaje: "Error al busca los usuarios" });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const id = req.params._id;
    const usuarioBuscado = await Usuario.findById(id);
    console.log(usuarioBuscado);
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    res.status(404).json({ mensaje: "error al buscar los usuarios" });
  }
};

export const borrarUsuarios = async (req, res) => {
  try {
    const id = req.params._id;
    Usuario.findByIdAndDelete(id, (err, usuario) => {
      if (err || usuario === null) {
        console.log(err);
        return res
          .status(404)
          .json({ mensaje: "No se pudo eliminar el usuario" });
      }
      console.log(usuario);
      res.status(200).json({
        mensaje: "El usuario fue eliminado correctamente",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      mensaje: "Error al intentar borrar un producto",
    });
  }
};
