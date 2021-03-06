import routerx from 'express-promise-router';
import VentaController from '../controllers/VentaController';
import Auth from '../middlewares/Auth';

const VentaRoutes = routerx();

VentaRoutes.post('/add',Auth.verifyUsuarioVendedor,VentaController.add);
VentaRoutes.get('/query',Auth.verifyUsuarioVendedor,VentaController.query);
VentaRoutes.get('/list',Auth.verifyUsuarioVendedor,VentaController.list);
VentaRoutes.get('/grafico12Meses',Auth.verifyUsuario,VentaController.grafico12Meses);
VentaRoutes.get('/consultaFechas',Auth.verifyUsuario,VentaController.consultaFechas);
VentaRoutes.put('/activate',Auth.verifyUsuarioVendedor,VentaController.activate);
VentaRoutes.put('/desactivate',Auth.verifyUsuarioVendedor,VentaController.desactivate)

export default VentaRoutes;