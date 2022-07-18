import { getRepository } from 'typeorm';
import { ICreateProductsDTO } from '../dtos/ICreateProductsDTO';
import { Products } from '../models/Products';

export class CreateProductsService {
  public async execute({ name, description }: ICreateProductsDTO): Promise<Products> {
    const repository = getRepository(Products);

    const verifyProduct = await repository.findOne({ where: { name } });

    if (verifyProduct) throw new Error('Product already exists');

    const product = await repository.save(repository.create({ name, description }));

    return product;
  }
}
