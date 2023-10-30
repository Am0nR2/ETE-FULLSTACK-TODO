import {
  Table,
  Column,
  Model,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { UserTeam } from '../../team/entities/user-team.entity';
import { Team } from '../../team/entities';
import { ToDo } from '../../todo/entities';

@Table
export class User extends Model<User> {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @BelongsToMany(() => Team, () => UserTeam)
  teams: Team[];

  @HasMany(() => ToDo)
  todos: ToDo[];
}

// import { Table, Column, Model, HasMany } from 'sequelize-typescript';
// import { Team } from '../../team/entities';

// @Table
// export class User extends Model<User> {
//   @Column({ unique: true })
//   name: string;

//   @Column({ unique: true })
//   email: string;

//   @Column
//   password: string;

//   @HasMany(() => Team)
//   teams: Team[];
// }
