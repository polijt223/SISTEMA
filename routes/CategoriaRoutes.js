import routerx from 'express-promise-router';
import CategoriaController from '../controllers/CategoriaController';
import Auth from '../middlewares/Auth';

const CategoriaRoutes = routerx();

CategoriaRoutes.post('/add',CategoriaController.add);
//CategoriaRoutes.post('/add',Auth.verifyUsuarioAlmacenero,CategoriaController.add);
CategoriaRoutes.get('/query',Auth.verifyUsuarioAlmacenero,CategoriaController.query);
//CategoriaRoutes.get('/list',Auth.verifyUsuarioAlmacenero,CategoriaController.list);
CategoriaRoutes.get('/list',CategoriaController.list);
CategoriaRoutes.put('/update',CategoriaController.update);
//CategoriaRoutes.put('/update',Auth.verifyUsuarioAlmacenero,CategoriaController.update);
CategoriaRoutes.delete('/remove',CategoriaController.remove);
//CategoriaRoutes.delete('/remove',Auth.verifyUsuarioAlmacenero,CategoriaController.remove);
CategoriaRoutes.put('/activate',CategoriaController.activate);
CategoriaRoutes.put('/desactivate',CategoriaController.desactivate);
//CategoriaRoutes.put('/activate',Auth.verifyUsuarioAlmacenero,CategoriaController.activate);
//CategoriaRoutes.put('/desactivate',Auth.verifyUsuarioAlmacenero,CategoriaController.desactivate);

export default CategoriaRoutes;
