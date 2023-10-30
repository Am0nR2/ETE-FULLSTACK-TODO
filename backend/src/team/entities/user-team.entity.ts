import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  Column,
} from 'sequelize-typescript';
import { Team } from '.';
import { User } from '../../auth/entities';

@Table
export class UserTeam extends Model<UserTeam> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Team)
  @Column
  teamId: number;

  //   @Column({ allowNull: false })
  //   isFounder: boolean;

  // Define associations with User and Team models
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Team)
  team: Team;
}
