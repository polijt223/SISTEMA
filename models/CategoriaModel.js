import mongoose,{Schema} from 'mongoose';

const categoriaSchma = new Schema({

    nombre:{type:String, maxlength:50,unique:true,required:true},
    descripcion:{type:String,maxlength:255},
    estado:{type:Number,default:1},
    createAt:{type:Date,default:Date.now}

});

const CategoriaModel = mongoose.model('categoria',categoriaSchma);

export default CategoriaModel;