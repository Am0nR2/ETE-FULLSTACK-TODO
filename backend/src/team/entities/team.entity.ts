import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../auth/entities';
import { UserTeam } from './user-team.entity';
import { ToDo } from '../../todo/entities';

@Table
export class Team extends Model<Team> {
  @Column({ unique: true })
  name: string;

  // @Column
  // team_id?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  founder_id: number;

  @BelongsToMany(() => User, () => UserTeam)
  users: User[];

  @HasMany(() => ToDo)
  todos: ToDo[];
}

// import {
//   Table,
//   Column,
//   Model,
//   BelongsTo,
//   ForeignKey,
//   DataType,
// } from 'sequelize-typescript';
// import { User } from '../../auth/entities';

// @Table
// export class Team extends Model<Team> {
//   @Column({ unique: true })
//   name: string;

//   @Column
//   team_id?: string;

//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   founder_id: number;

//   @BelongsTo(() => User)
//   user: User;
// }
