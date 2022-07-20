import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreateUsersRoles1658144967046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users_roles',
      columns: [
        {
          name: 'role_id',
          type: 'uuid',
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
      ],
    }));

    await queryRunner.createForeignKey('users_roles', new TableForeignKey({
      name: 'RelationPivotToRoles',
      columnNames: ['role_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('users_roles', new TableForeignKey({
      name: 'RelationPivotToUsers',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_roles', 'RelationPivotToRoles');
    await queryRunner.dropForeignKey('users_roles', 'RelationPivotToUsers');
    await queryRunner.dropTable('users_roles');
  }
}
