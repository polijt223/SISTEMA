import routerx from 'express-promise-router';
import UsuarioController from '../controllers/UsuarioController';
import Auth from '../middlewares/Auth';

const UsuarioRoutes = routerx();

UsuarioRoutes.post('/add',Auth.verifyUsuarioAdministrador,UsuarioController.add);
UsuarioRoutes.get('/query',Auth.verifyUsuarioAdministrador,UsuarioController.query);
UsuarioRoutes.get('/list',Auth.verifyUsuarioAdministrador,UsuarioController.list);
UsuarioRoutes.put('/update',Auth.verifyUsuarioAdministrador,UsuarioController.update);
UsuarioRoutes.delete('/remove',Auth.verifyUsuarioAdministrador,UsuarioController.remove);
UsuarioRoutes.put('/activate',Auth.verifyUsuarioAdministrador,UsuarioController.activate);
UsuarioRoutes.put('/desactivate',Auth.verifyUsuarioAdministrador,UsuarioController.desactivate);
UsuarioRoutes.post('/login',UsuarioController.login);

export default UsuarioRoutes;