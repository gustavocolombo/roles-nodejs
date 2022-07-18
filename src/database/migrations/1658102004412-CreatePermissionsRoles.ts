import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreatePermissionsRoles1658102004412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'permissions_roles',
      columns: [
        {
          name: 'permission_id',
          type: 'uuid',
        },
        {
          name: 'role_id',
          type: 'uuid',
        },
      ],
    }));

    await queryRunner.createForeignKey('permissions_roles', new TableForeignKey({
      name: 'RelationPivotToPermissions',
      columnNames: ['permission_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'permissions',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('permissions_roles', new TableForeignKey({
      name: 'RelationPivotToRoles',
      columnNames: ['role_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('permissions_roles', 'RelationPivotToPermissions');
    await queryRunner.dropForeignKey('permissions_roles', 'RelationPivotToRoles');
    await queryRunner.dropTable('permissions_roles');
  }
}
