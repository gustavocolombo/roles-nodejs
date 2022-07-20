import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { Users } from '../infra/typeorm/entities/User';
import { Roles } from '../../authentication/infra/typeorm/entities/Roles';

export class CreateUserService {
  public async execute({
    name, username, password, roles,
  }: ICreateUserDTO): Promise<Users> {
    const userRepository = getRepository(Users);
    const roleRepository = getRepository(Roles);

    const findUser = await userRepository.findOne({ where: { username } });

    if (findUser) throw new Error('User with username already registered');

    const verifyRolesExists = await roleRepository.findByIds(roles);

    const user = await userRepository.save(
      userRepository.create({
        name, username, password: await hash(password, 8), roles: verifyRolesExists,
      }),
    );

    return user;
  }
}
