import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { TeamModule } from './team/team.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    AuthModule,
    JwtModule,
    TeamModule,
    TodoModule,
  ],
})
export class AppModule {}
