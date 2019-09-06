import models from '../models';

export default {

    add: async(req,res,next) =>{
        try{
            const reg = await models.PersonaModel.create(req.body);
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
            const reg = await models.PersonaModel.findOne({_id: req.query._id});
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
            const reg = await models.PersonaModel.find({$or:[{'nombre': new RegExp(valor,'i')},{'email': new RegExp(valor,'i')}]},{createAt:0})
            .sort({'createAt':-1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    listClientes: async(req,res,next) =>{
        try{
            let valor = req.query.valor;
            //Dentro de las llaves que contienen al $or podemos pasar un segundo parametro para filtrar lo que traemos de la DB
            //  ([$or{parametros para buscar en la DB},{'tipo_persona':'Cliente'}],{createAt:0})   
            //  {createAt:0} Sirve para indicar con 0 que datos no queremos traer de la DB
            const reg = await models.PersonaModel.find(
                {$or:[{'nombre': new RegExp(valor,'i')},{'email': new RegExp(valor,'i')}],'tipo_persona':'Cliente'},{createAt:0})
            .sort({'createAt':-1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    listProveedores: async(req,res,next) =>{
        try{
            let valor = req.query.valor;
            //Dentro de las llaves que contienen al $or podemos pasar un segundo parametro para filtrar lo que traemos de la DB
            //  ([$or{parametros para buscar en la DB},{'tipo_persona':'Cliente'}],{createAt:0})   
            //  {createAt:0} Sirve para indicar con 0 que datos no queremos traer de la DB
            const reg = await models.PersonaModel.find(
                {$or:[{'nombre': new RegExp(valor,'i')},{'email': new RegExp(valor,'i')}],'tipo_persona':'Proveedor'},{createAt:0})
            .sort({'createAt':-1});
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
            //findByIdAndUpdate espera 2 le pase 2 parametros, 1* el _id o parametro por el que realizaremos el update
            //2* le asignamos a los valores que tenemos guardados en MongoDB , los nuevos valores. Por Ejemplo:
            // rol es igual al rol que me llega por req.body  ------> rol:req.body.rol
            const reg = await models.PersonaModel.findByIdAndUpdate({_id:req.body._id},
                {tipo_persona:req.body.tipo_persona ,nombre:req.body.nombre,tipo_documento:req.body.tipo_documento, num_documento:req.body.num_documento,
                     direccion:req.body.direccion, email:req.body.email}); 
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
            const reg = await models.PersonaModel.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.PersonaModel.findByIdAndUpdate({_id: req.body._id},{estado:1});
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
            const reg = await models.PersonaModel.findByIdAndUpdate({_id: req.body._id},{estado:0});
            res.status(200).json(reg);            
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

}