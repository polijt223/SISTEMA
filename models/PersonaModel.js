import mongoose, { Schema } from 'mongoose';

const personaSchema = new Schema({
    tipo_persona:{type:String ,maxlength:50, required:true},
    nombre:{type:String ,maxlength:30, unique:true, required:true},
    tipo_documento:{type:String, maxlength:30},
    num_documento:{type:Number, maxlength:20},
    direccion:{type:String, maxlength:250},
    telefono:{type:String,maxlength:20},
    email:{type:String,maxlength:50,unique:true},
    estado:{type:Number, default:1},
    createAt:{type:Date, default:Date.now}
});

const PersonaModel = mongoose.model('persona',personaSchema);

export default PersonaModel;