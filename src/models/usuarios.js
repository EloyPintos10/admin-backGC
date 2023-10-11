import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        maxlength: 30,
        required: true
    },
    apellido:{
        type: String,
        maxlength: 30,
        required: true
    },
    userName:{
        type: String,
        maxlength: 30,
        required: true
    },
    email:{
        type: String,
        maxlength: 300,
        unique:true,
        required:true
    },
    perfil:{
        type: String,
       
    },
    password:{
        type: String,
        required:true
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;