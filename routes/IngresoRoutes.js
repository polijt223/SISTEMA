import routerx from 'express-promise-router';
import IngresoController from '../controllers/IngresoController';
import Auth from '../middlewares/Auth';

const IngresoRoutes = routerx();

IngresoRoutes.post('/add',Auth.verifyUsuarioAlmacenero,IngresoController.add);
IngresoRoutes.get('/query',Auth.verifyUsuarioAlmacenero,IngresoController.query);
IngresoRoutes.get('/list',Auth.verifyUsuarioAlmacenero,IngresoController.list);
IngresoRoutes.put('/activate',Auth.verifyUsuarioAlmacenero,IngresoController.activate);
IngresoRoutes.put('/desactivate',Auth.verifyUsuarioAlmacenero,IngresoController.desactivate)

export default IngresoRoutes;