import models from '../models';

export default {

    add: async(req,res,next) =>{
        try{
            const reg = await models.ArticuloModel.create(req.body);
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
            const reg = await models.ArticuloModel.findOne({_id: req.query._id})
            .populate('categoria',{'nombre':1})
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

    queryCodigo: async(req,res,next) =>{
        try{
            const reg = await models.ArticuloModel.findOne({codigo: req.query.codigo})
            .populate('categoria',{'nombre':1})
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
            const reg = await models.ArticuloModel.find(
                {$or:[
                    {'nombre': new RegExp(valor,'i')},
                    {'descripcion': new RegExp(valor,'i')}
                ]},
                /*{createAt:0}*//*Sirve para filtrar el envio de fecha por http*/
            )
            .populate('categoria',{'nombre':1})
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
            const reg = await models.ArticuloModel.findByIdAndUpdate({_id:req.body._id},
                {
                    categoria:req.body.categoria,
                    nombre:req.body.nombre,
                    codigo:req.body.codigo,
                    nombre:req.body.nombre,
                    descripcion:req.body.descripcion, 
                    precio_venta:req.body.precio_venta,
                    stock:req.body.stock,
                    estado:req.body.estado,
                    createAt:req.body.createAt
                });
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
            const reg = await models.ArticuloModel.findByIdAndDelete({_id: req.query._id});
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
            const reg = await models.ArticuloModel.findByIdAndUpdate({_id: req.body._id},{estado:1});
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
            const reg = await models.ArticuloModel.findByIdAndUpdate({_id: req.body._id},{estado:0});
            res.status(200).json(reg);            
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    }
}