import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Team } from './entities';
import { User } from '../auth/entities';
import { ToDo } from '../todo/entities';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team) private readonly teamRepository: typeof Team,
  ) {}

  async create(body: CreateTeamDto, currentUser) {
    const team = await this.teamRepository.create({
      name: body.name,
      founder_id: currentUser.id,
    });
    await team.$add('user', currentUser);

    return team;
    // return currentUser;
  }

  async findAll() {
    return await this.teamRepository.findAll({});
  }

  async findOne(id: number) {
    const team = await this.teamRepository.findByPk(id, {
      include: [ToDo, User],
    });
    if (!team)
      throw new NotFoundException('Team with proven id is not found...');

    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepository.findByPk(id);

    if (!team) {
      throw new NotFoundException('Team with the specified ID is not found.');
    }

    if (updateTeamDto.add_user) {
      const user = await User.findByPk(updateTeamDto.add_user);
      if (user) {
        await team.$add('user', user);
      }
    }

    if (updateTeamDto.delete_user) {
      const user = await User.findByPk(updateTeamDto.delete_user);
      if (user) {
        await team.$remove('user', user);
      }
    }

    if (updateTeamDto.name) {
      team.name = updateTeamDto.name;
      await team.save();
    }

    return { msg: 'Team has been successfully updated' };
  }

  async remove(id: number, currentUser) {
    const team = await this.teamRepository.findByPk(id);

    if (!team) {
      throw new NotFoundException('Team with the specified ID is not found.');
    }

    if (team.founder_id !== currentUser.id)
      throw new ForbiddenException(
        'You are not authorized to delete this team... Only Founder can do such an action...',
      );

    await team.destroy();

    return { msg: 'Team deleted successfully' };
  }
}
