import { Router } from 'express';
import { CreateRoleService } from '../../../services/CreateRoleService';

const rolesRoutes = Router();

rolesRoutes.post('/', async (request, response) => {
  const { name, description, permissions } = request.body;

  const service = new CreateRoleService();

  const roles = await service.execute({ name, description, permissions });

  return response.json(roles);
});

export default rolesRoutes;
