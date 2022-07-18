import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authconfig from '../config/authconfig';
import { IAuthenticateUserDTO } from '../dtos/IAuthenticateLoginDTO';
import { Users } from '../models/User';

interface IResponseLogin{
  user: Users;
  token: string;
}

export class AuthenticateUserService {
  public async execute({ username, password }: IAuthenticateUserDTO): Promise<IResponseLogin> {
    const repository = getRepository(Users);

    const user = await repository.findOne({ where: { username } });

    if (!user) throw new Error('User with this username not found');

    const verifyPass = await compare(password, user.password);

    if (!verifyPass) throw new Error('Combination username/password does not match');

    const token = sign(
      { id: user.id, name: user.name },
      authconfig.token,
      { expiresIn: authconfig.expiresIn, subject: user.id },
    );

    return {
      user, token,
    };
  }
}
