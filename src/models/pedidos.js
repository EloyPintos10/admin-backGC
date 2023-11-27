import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  usuario: {
    type: String,
    required: true,
  },

  montoTotal: {
    type: Number,
    required: true,
  },

  detallePedido: {
    type: Array,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
});

const Pedido = mongoose.model("pedido", pedidoSchema);

export default Pedido;
