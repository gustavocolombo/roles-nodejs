import { getRepository } from 'typeorm';
import { ICreateRoleDTO } from '../dtos/ICrateRoleDTO';
import { Permissions } from '../infra/typeorm/entities/Permissions';
import { Roles } from '../infra/typeorm/entities/Roles';

export class CreateRoleService {
  public async execute({ name, description, permissions }: ICreateRoleDTO): Promise<Roles> {
    const rolesRepository = getRepository(Roles);
    const permissionRepository = getRepository(Permissions);

    const verifyRole = await rolesRepository.findOne({ where: { name } });

    if (verifyRole) throw new Error('Role already exists');

    const verifyPermissionExists = await permissionRepository.findByIds(permissions);

    const role = await rolesRepository.save(
      rolesRepository.create({ name, description, permission: verifyPermissionExists }),
    );

    return role;
  }
}
