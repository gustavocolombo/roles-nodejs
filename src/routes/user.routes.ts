import { Router } from 'express';
import { CreateUserService } from '../services/CreateUserService';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  const { name, username, password } = request.body;

  const service = new CreateUserService();

  const user = await service.execute({ name, username, password });

  return response.json(user);
});

export default userRoutes;
