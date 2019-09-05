import routerx from 'express-promise-router';
import UsuarioController from '../controllers/UsuarioController';

const UsuarioRoutes = routerx();

UsuarioRoutes.post('/add',UsuarioController.add);
UsuarioRoutes.get('/query',UsuarioController.query);
UsuarioRoutes.get('/list',UsuarioController.list);
UsuarioRoutes.put('/update',UsuarioController.update);
UsuarioRoutes.delete('/remove',UsuarioController.remove);
UsuarioRoutes.put('/activate',UsuarioController.activate);
UsuarioRoutes.put('/desactivate',UsuarioController.desactivate);
UsuarioRoutes.post('/login',UsuarioController.login);

export default UsuarioRoutes;