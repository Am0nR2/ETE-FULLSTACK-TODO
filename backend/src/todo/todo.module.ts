import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ToDo } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([ToDo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
