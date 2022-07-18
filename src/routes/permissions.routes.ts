import { Router } from 'express';
import { CreatePermissionsService } from '../services/CreatePermissionsService';

const permissionsRoutes = Router();

permissionsRoutes.post('/', async (request, response) => {
  const { name, description } = request.body;

  const service = new CreatePermissionsService();

  const permissions = await service.execute({ name, description });

  return response.json(permissions);
});

export default permissionsRoutes;
