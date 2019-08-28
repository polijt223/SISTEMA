import CategoriaRouter from './CategoriaRoutes';
import routerx from 'express-promise-router';

    const router = routerx();

    router.use('/categoria',CategoriaRouter);



export default router