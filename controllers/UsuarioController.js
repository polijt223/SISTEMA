import models from '../models';
import bcrypt from 'bcryptjs';
import Token from '../services/Token'

export default {

    add: async(req,res,next) =>{
        try{
            //Antes de guardar los datos, con la funcion bcrypt.hash, encriptamos el password,
            //Es decir modificamos el valor del password para que sea igual péro en version encriptada
            req.body.password = await bcrypt.hash(req.body.password ,10);
            //Despues de encriptar se guarda el body en mongo
            const reg = await models.UsuarioModel.create(req.body);
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    query: async(req,res,next) =>{
        try{
            //Mongoose crea por defecto valor "_id" para cada tabla que tengamos,
            //el metodo findOne de mongoose , nos pide le pasemos un _id igual a lo que queramos 
            //para poder buscarlo... "_id:req.query._id"   = "_id:20"
            const reg = await models.UsuarioModel.findOne({_id: req.query._id});
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe!'
                });
            }else{
                res.status(200).json(reg);
            }
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    list: async(req,res,next) =>{
        try{
            let valor = req.query.valor;
            //El metodo espera 2 parametros, 'Los parametros para buscar' y 'parametros filtrados para no ser mostrados'
            //Con el valor 0 no se mostrara el parametro nombre:0, y con el 1 especificamos que solo se muestren esos nombre:1   .
            //En sort podemos indicar el orden en que queresmo se muestre el listado (-1 de menor a mayor y 0 de mayor a menor)
            // y con respecto a que porametro   .
            //$or permite que se liste por un valor o otro
            //new RegExp es una clase que permite el uso de expresiones regulares en la consultas, en este caso la utilizamos en los parametros
            //de busqueda para que acepte mayusculas y minusculas , 'i' es justamente una expresion regular que permite no haya distinsion entre
            //Mayusculas y Minusculas, para utilizar la expresion regular primiero debemos obtenerla de req.query.valor
            const reg = await models.UsuarioModel.find({$or:[{'nombre': new RegExp(valor,'i')},{'email': new RegExp(valor,'i')}],},{createAt:0})
            .sort({'nombre':-1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    update: async(req,res,next) =>{
        try{
            //guardo en la variable pass, el password que me llega por req.
            let pass = req.body.password;
            //busco el password que tengo en MongoDB para ese usuario con _id:req.body._id , y lo guardo en la constante reg0
            const reg0 = await models.UsuarioModel.findOne({_id:req.body._id});
            //En caso de ser diferente el password de la MongoDB y el que me pasa el usuario por req
            if (pass!=reg0) {
                    //Encripto el pass que me llega por req
                req.body.password = await bcrypt.hash(req.body.password,10);
            }
            //En caso de no ser diferente, es decir son iguales, significa que el usuario no quiere cambiar el password por lo 
            //que no hace falta encriptarlo
            //findByIdAndUpdate espera 2 le pase 2 parametros, 1* el _id o parametro por el que realizaremos el update
            //2* le asignamos a los valores que tenemos guardados en MongoDB , los nuevos valores. Por Ejemplo:
            // rol es igual al rol que me llega por req.body  ------> rol:req.body.rol
            const reg = await models.UsuarioModel.findByIdAndUpdate({_id:req.body._id},
                {rol:req.body.rol ,nombre:req.body.nombre,tipo_documento:req.body.tipo_documento, num_documento:req.body.num_documento,
                     direccion:req.body.direccion, email:req.body.email, password:req.body.password }); 
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    remove: async(req,res,next) =>{
        try{
            const reg = await models.UsuarioModel.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    activate: async(req,res,next) =>{
        try{
            const reg = await models.UsuarioModel.findByIdAndUpdate({_id: req.body._id},{estado:1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    desactivate: async(req,res,next) =>{
        try{
            const reg = await models.UsuarioModel.findByIdAndUpdate({_id: req.body._id},{estado:0});
            res.status(200).json(reg);            
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    login: async (req,res,next) =>{
        try{
            let user = await models.UsuarioModel.findOne({email:req.body.email,estado:1});
            if(user){
                //Significa que el user no esta vacio y existe en la base de datos
                //Hacemos una variable match para guardar el resultado de comparar el password ingresado con el que esta 
                //guardado en la base de datos
                let match = await bcrypt.compare(req.body.password,user.password);
                if(match){
                    let tokenReturn = await Token.encode(user._id);
                    res.status(200).send({
                        mensaje:'Se genero el token',
                        tokenReturn,
                        user
                    });
                }else{
                    //Sino significa que el password es incorrecto
                    res.status(404).send({
                        error:'Usuario o Password incorrecto!'
                    });
                }
            }else{
                //Sino el usuario no existe
                res.status(404).send({
                    error:'El usuario no existe'
                });
            }
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    }
}