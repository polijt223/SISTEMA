import routerx from 'express-promise-router';
import CategoriaController from '../controllers/CategoriaController';

const CategoriaRoutes = routerx();

CategoriaRoutes.post('/add',CategoriaController.add);
CategoriaRoutes.get('/query',CategoriaController.query);
CategoriaRoutes.get('/list',CategoriaController.list);
CategoriaRoutes.put('/update',CategoriaController.update);
CategoriaRoutes.delete('/remove',CategoriaController.remove);
CategoriaRoutes.put('/activate',CategoriaController.activate);
CategoriaRoutes.put('/desactivate',CategoriaController.desactivate);

export default CategoriaRoutes;
