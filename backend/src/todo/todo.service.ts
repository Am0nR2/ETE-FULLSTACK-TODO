import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ToDo } from './entities';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../auth/entities';
import { CurrentUserInterface } from '../auth/interfaces/interface';
import { todo } from 'node:test';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(ToDo) private readonly todoRepository: typeof ToDo,
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
    currentUser: CurrentUserInterface,
  ) {
    delete createTodoDto.private;
    return await this.todoRepository.create({
      ...createTodoDto,
      creatorId: currentUser.id,
    });
  }

  async findAll(currentUser: CurrentUserInterface) {
    return await this.todoRepository.findAll({
      where: {
        creatorId: currentUser.id,
      },
    });
  }

  async findOne(id: number, currentUser: CurrentUserInterface) {
    const toDo = await this.todoRepository.findByPk(id, { include: [User] });
    console.log(todo);
    if (!toDo)
      throw new NotFoundException('ToDO with proven id is not found...');

    if (toDo.creatorId !== currentUser.id)
      throw new UnauthorizedException(
        "You only can access your todo list or ToDo's in your team...",
      );
    return toDo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, currentUser) {
    const toDo = await this.todoRepository.findByPk(id);

    if (!toDo) {
      throw new NotFoundException('ToDo with the specified ID is not found.');
    }

    if (toDo.teamId === null && toDo.creatorId !== currentUser.id)
      throw new UnauthorizedException(
        'You are not authorized to edit this toDo...',
      );

    const checkUserTeams = currentUser.teams.map((team) => team.id);
    if (toDo.teamId && !checkUserTeams.includes(toDo.teamId))
      throw new ForbiddenException(
        'Since you are not member of the team, you cannot edit this toDo...',
      );

    return await toDo.update({ ...updateTodoDto });
  }

  async remove(id: number, currentUser) {
    const toDo = await this.todoRepository.findByPk(id);

    if (!toDo) {
      throw new NotFoundException('ToDo with the specified ID is not found.');
    }

    if (toDo.teamId === null && toDo.creatorId !== currentUser.id)
      throw new UnauthorizedException(
        'You are not authorized to edit or delete this toDo...',
      );

    const checkUserTeams = currentUser.teams.map((team) => team.id);
    if (toDo.teamId && !checkUserTeams.includes(toDo.teamId))
      throw new ForbiddenException(
        'Since you are not member of the team, you cannot edit this toDo...',
      );

    await toDo.destroy();

    return { msg: 'ToDO has been successfully removed from the db...' };
  }
}
