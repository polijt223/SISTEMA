import CategoriaRoutes from './CategoriaRoutes';
import ArticuloRoutes from './ArticuloRoutes';
import routerx from 'express-promise-router';

    const routes = routerx();

    routes.use('/categoria',CategoriaRoutes);
    routes.use('/articulo',ArticuloRoutes);


export default routes;