import { Router } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (request, response) => {
  const { username, password } = request.body;

  const service = new AuthenticateUserService();

  const { user, token } = await service.execute({ username, password });

  return response.json({ user, token });
});

export default sessionRoutes;
