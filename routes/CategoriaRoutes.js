import routerx from 'express-promise-router';
import CategoriaController from '../controllers/CategoriaController';
import Auth from '../middlewares/Auth';

const CategoriaRoutes = routerx();

CategoriaRoutes.post('/add',Auth.verifyUsuarioAlmacenero,CategoriaController.add);
CategoriaRoutes.get('/query',Auth.verifyUsuarioAlmacenero,CategoriaController.query);
CategoriaRoutes.get('/list',Auth.verifyUsuario,CategoriaController.list);
CategoriaRoutes.put('/update',Auth.verifyUsuarioAlmacenero,CategoriaController.update);
CategoriaRoutes.delete('/remove',Auth.verifyUsuarioAlmacenero,CategoriaController.remove);
CategoriaRoutes.put('/activate',Auth.verifyUsuarioAlmacenero,CategoriaController.activate);
CategoriaRoutes.put('/desactivate',Auth.verifyUsuarioAlmacenero,CategoriaController.desactivate);

export default CategoriaRoutes;
