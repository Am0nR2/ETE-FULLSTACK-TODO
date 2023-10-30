import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../auth/entities';
import { Team } from '../../team/entities';

@Table
export class ToDo extends Model<ToDo> {
  @Column
  title: string;

  @Column
  description: string;

  @Column({ defaultValue: false })
  done: boolean;

  @ForeignKey(() => User)
  @Column
  creatorId: number;

  @BelongsTo(() => User)
  creator: User;

  @ForeignKey(() => Team)
  @Column
  teamId: number;

  @BelongsTo(() => Team)
  team: Team;
}
