import { Router } from 'express';
import permissionsRoutes from '../../../../authentication/infra/typeorm/http/permissions.routes';
import productsRoutes from '../../../../products/infra/typeorm/http/products.routes';
import rolesRoutes from '../../../../authentication/infra/typeorm/http/roles.routes';
import sessionRoutes from '../../../../authentication/infra/typeorm/http/session.routes';
import userRoutes from '../../../../users/infra/typeorm/http/user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/permissions', permissionsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/products', productsRoutes);

export default routes;
