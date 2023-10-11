import mongoose, {Schema} from "mongoose";

const productoSchema = new Schema({
    name:{
        type: String,
        required: true, 
        unique: true,      
        maxLength: 50,
        minLength: 2
    },
    price:{
        type: Number,
        required: true,
    },    
    description:{
        type: String,
        required: true,
        unique: true,
        maxLength: 300,
        minLength: 10
    },
    category:{
        type: String,
        required: true,
        maxLength: 80,
        minLength: 2
    },
    quantity:{
        type: Number,
        
    }
});

const Producto = mongoose.model("producto", productoSchema);

export default Producto;