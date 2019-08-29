import routerx from 'express-promise-router';
import CategoriaController from '../controllers/ArticuloController';

const ArticuloRoutes = routerx();

ArticuloRoutes.post('/add',CategoriaController.add);
ArticuloRoutes.get('/query',CategoriaController.query);
ArticuloRoutes.get('/list',CategoriaController.list);
ArticuloRoutes.put('/update',CategoriaController.update);
ArticuloRoutes.delete('/remove',CategoriaController.remove);
ArticuloRoutes.put('/activate',CategoriaController.activate);
ArticuloRoutes.put('/desactivate',CategoriaController.desactivate);

export default ArticuloRoutes;
