import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Users } from '../models/User';

async function decodeToken(request: Request) {
  const authHeader = request.headers.authorization || '';
  const userRepository = getRepository(Users);

  const [, token] = authHeader?.split(' ');

  const payload = decode(token);

  const user = await userRepository.findOne(String(payload?.sub), { relations: ['roles'] });

  return user;
}

export function is(roles: string[]) {
  async function roleAuthorized(request: Request, response: Response, next: NextFunction) {
    const user = await decodeToken(request);

    const userRoles = user?.roles.map((role) => role.name);

    const existsRoles = userRoles?.some((r) => roles.includes(r));

    if (existsRoles) return next();

    return response.status(401).json('You are not authorized');
  }
  return roleAuthorized;
}
