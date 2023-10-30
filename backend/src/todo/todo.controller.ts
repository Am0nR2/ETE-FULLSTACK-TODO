import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guard';
import { CurrentUser } from '../auth/decorators';
import { CurrentUserInterface } from '../auth/interfaces/interface';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@CurrentUser() currentUser, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto, currentUser);
  }

  @Get()
  findAll(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.todoService.findAll(currentUser);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.todoService.findOne(+id, currentUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @CurrentUser() currentUser,
  ) {
    return this.todoService.update(+id, updateTodoDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() currentUser) {
    return this.todoService.remove(+id, currentUser);
  }
}
