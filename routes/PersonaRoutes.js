import routerx from 'express-promise-router';
import PersonaController from '../controllers/PersonaController';
import Auth from '../middlewares/Auth';

const PersonaRoutes = routerx();

PersonaRoutes.post('/add',Auth.verifyUsuario,PersonaController.add);
PersonaRoutes.get('/query',Auth.verifyUsuario,PersonaController.query);
PersonaRoutes.get('/list',Auth.verifyUsuario,PersonaController.list);
PersonaRoutes.get('/listClientes',Auth.verifyUsuario,PersonaController.listClientes);
PersonaRoutes.get('/listProveedores',Auth.verifyUsuario,PersonaController.listProveedores);
PersonaRoutes.put('/update',Auth.verifyUsuario,PersonaController.update);
PersonaRoutes.delete('/remove',Auth.verifyUsuario,PersonaController.remove);
PersonaRoutes.put('/activate',Auth.verifyUsuario,PersonaController.activate);
PersonaRoutes.put('/desactivate',Auth.verifyUsuario,PersonaController.desactivate);

export default PersonaRoutes;