import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { Users } from '../models/User';

export class CreateUserService {
  public async execute({ name, username, password }: ICreateUserDTO): Promise<Users> {
    const repository = getRepository(Users);

    const findUser = await repository.findOne({ where: { username } });

    if (findUser) throw new Error('User with username already registered');

    const user = await repository.save(
      repository.create({ name, username, password: await hash(password, 8) }),
    );

    return user;
  }
}
