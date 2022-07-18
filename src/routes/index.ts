import { Router } from 'express';
import permissionsRoutes from './permissions.routes';
import rolesRoutes from './roles.routes';
import sessionRoutes from './session.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/permissions', permissionsRoutes);
routes.use('/roles', rolesRoutes);

export default routes;
