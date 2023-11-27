import mongoose from "mongoose";

 
 //const url = 'mongodb://127.0.0.1:27017/admin'
 const url = 'mongodb+srv://eloyPintos10:Pintose10@cluster0.tnezf59.mongodb.net/adminGC'
 const db = 'dash/adminGC'

mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('BD conectada: ' + db)
})