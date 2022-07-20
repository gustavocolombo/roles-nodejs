import { Router } from 'express';
import { is } from '../../../../shared/middlewares/permission';
import { CreateProductsService } from '../../../services/CreateProductsService';

const productsRoutes = Router();

productsRoutes.post('/', is(['ROLE_ADMIN']), async (request, response) => {
  const { name, description } = request.body;

  const service = new CreateProductsService();

  const products = await service.execute({ name, description });

  return response.json(products);
});

export default productsRoutes;
