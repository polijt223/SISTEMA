import routerx from 'express-promise-router';
import CategoriaController from '../controllers/ArticuloController';
import Auth from '../middlewares/Auth';

const ArticuloRoutes = routerx();

ArticuloRoutes.post('/add',Auth.verifyUsuarioAlmacenero,CategoriaController.add);
ArticuloRoutes.get('/query',Auth.verifyUsuarioAlmacenero,CategoriaController.query);
ArticuloRoutes.get('/list',Auth.verifyUsuarioAlmacenero,CategoriaController.list);
ArticuloRoutes.put('/update',Auth.verifyUsuarioAlmacenero,CategoriaController.update);
ArticuloRoutes.delete('/remove',Auth.verifyUsuarioAlmacenero,CategoriaController.remove);
ArticuloRoutes.put('/activate',Auth.verifyUsuarioAlmacenero,CategoriaController.activate);
ArticuloRoutes.put('/desactivate',Auth.verifyUsuarioAlmacenero,ategoriaController.desactivate);

export default ArticuloRoutes;
