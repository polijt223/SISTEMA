import mongoose, {Schema} from 'mongoose';

const articulosSchema = new Schema({
    categoria: { type: Schema.ObjectId, ref: 'categoria' },
    codigo: { type: String, maxlength: 64 },
    nombre: { type: String, maxlength: 50, required: true, unique: true },
    descripcion: { type: String, maxlength: 250 },
    precio_venta: { type: Number, required: true },
    stock: { type: Number, required: true },
    estado: { type: Number, default: 1 },
    createAt: { type: Date, default: Date.now }
});

const ArticuloModel = mongoose.model('articulo', articulosSchema);

export default ArticuloModel;