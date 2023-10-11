import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import "./database"
import productosRouter from "./routes/productos.routes"
import authRouter from "./routes/usuario.routes"
dotenv.config();


const app = express();

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto " + app.get("port"));
});



//middlewears:

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

//rutas

app.use("/apiadmin", productosRouter);
app.use("/apiadmin/auth", authRouter);


