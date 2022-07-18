import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Permissions } from './Permissions';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name: string;

  @Column()
    description: string;

  @ManyToMany(() => Permissions)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
    permission: Permissions[];

  @CreateDateColumn()
    created_at: Date;
}
