import models from '../models';

async function aumentarStock (idArticulo,cantidad) {
    let {stock} = await models.ArticuloModel.findOne({_id:idArticulo});
    let nStock = parseInt(stock) + parseInt(cantidad);
    const reg = await models.ArticuloModel.findOneAndUpdate({_id:idArticulo},{stock:nStock});
} 

async function disminuirStock  (idArticulo,cantidad) {
    let {stock} = await models.ArticuloModel.findOne({_id:idArticulo});
    let nStock = parseInt(stock) - parseInt(cantidad);
    const reg = await models.ArticuloModel.findOneAndUpdate({_id:idArticulo},{stock:nStock});
}

export default {

    add: async(req,res,next) =>{
        try{
            const reg = await models.IngresoModel.create(req.body);
            //Actualizar stock 
            let detalle = req.body.detalles;
            detalle.map( (x) => {
                aumentarStock(x._id,x.cantidad);
            });

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
            //Con populate() traemos los datos de lista (tabla) a la que hacemos referencia (relacion), 
            //{nombre:1} Si pasamo un segundo parametro de esta forma con 1 decimos que solo traiga ese registro y con cero {nombre:0}
            //Le estamos diciendo que no traiga ese registro.
            const reg = await models.IngresoModel.findOne({_id: req.query._id})
            .populate('UsuarioModel',{nombre:1})
            .populate('PersonaModel',{nombre:1});

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
            const reg = await models.IngresoModel.find({$or:[{'num_comprobante': new RegExp(valor,'i')},{'serie_comprobante': new RegExp(valor,'i')}]},{createAt:0})
            .populate('UsuarioModel',{nombre:1})
            .populate('PersonaModel',{nombre:1})
            .sort({'createAt':-1});
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
            const reg = await models.IngresoModel.findByIdAndUpdate({_id: req.body._id},{estado:1});
            //Actualizar stock 
            let detalle = reg.detalles;
            detalle.map( (x) => {
                aumentarStock(x._id,x.cantidad);
            });
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
            const reg = await models.IngresoModel.findByIdAndUpdate({_id: req.body._id},{estado:0});
            //Actualizar stock 
            let detalle = reg.detalles;
            detalle.map( (x) => {
                disminuirStock(x._id,x.cantidad);
            });
            res.status(200).json(reg);            
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    },

    grafico12Meses: async(req,res,next) => {
        try {
            const reg = await models.IngresoModel.aggregate(
                [
                    {
                        $group:{
                            _id:{
                                mes:{$month:"$createAt"},
                                year:{$year:"$createAt"}
                                },
                            tolal:{$sum:"$total"},
                            numero:{$sum:1}
                        }
                    },
                    {
                        $sort:{
                            "_id.year":-1,"_id.mes":1
                        }
                    }
                ]
            ).limit(12);  
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                mensaje:"Ocurrio un Error"
            });
            next(e);
        }
        
    },

    consultaFechas: async(req,res,next) =>{
        try{
            let start = req.query.start;
            let end = req.query.end;
            const reg = await models.IngresoModel.find({"createAt":{"$gte":start, "$lt":end}})
            .populate('UsuarioModel',{nombre:1})
            .populate('PersonaModel',{nombre:1})
            .sort({'createAt':-1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error' 
            });
            next(e);
        }
    }
   
}