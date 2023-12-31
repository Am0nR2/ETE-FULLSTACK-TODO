import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Team } from './entities';
import { UserTeam } from './entities/user-team.entity';

@Module({
  imports: [SequelizeModule.forFeature([Team, UserTeam])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
