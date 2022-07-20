import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../../../authentication/infra/typeorm/entities/Roles';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name: string;

  @Column()
    username: string;

  @Column()
    password: string;

  @ManyToMany(() => Roles)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
    roles: Roles[];

  @CreateDateColumn()
    created_at: Date;
}
