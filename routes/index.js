import CategoriaRoutes from './CategoriaRoutes';
import ArticuloRoutes from './ArticuloRoutes';
import UsuarioRoutes from './UsuarioRoutes';
import PersonaRoutes from './PersonaRoutes';
import routerx from 'express-promise-router';

    const routes = routerx();

    routes.use('/categoria',CategoriaRoutes);
    routes.use('/articulo',ArticuloRoutes);
    routes.use('/usuario',UsuarioRoutes);
    routes.use('/persona',PersonaRoutes);

export default routes;