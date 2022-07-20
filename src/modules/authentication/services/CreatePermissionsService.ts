import { getRepository } from 'typeorm';
import { ICreatePermissionDTO } from '../dtos/ICreatePermissionDTO';
import { Permissions } from '../infra/typeorm/entities/Permissions';

export class CreatePermissionsService {
  public async execute({ name, description }: ICreatePermissionDTO): Promise<Permissions> {
    const repository = getRepository(Permissions);

    const verifyPermission = await repository.findOne({ where: { name } });

    if (verifyPermission) throw new Error('Permission already exists');

    const permission = await repository.save(repository.create({ name, description }));

    return permission;
  }
}
