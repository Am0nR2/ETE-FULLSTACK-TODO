import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities';
import { JwtModule, JwtService } from '../jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from '../error/error.interceptor';
import { JwtStrategy } from './strategy';

@Module({
  imports: [SequelizeModule.forFeature([User]), JwtModule.jwtService()],
  providers: [
    AuthService,
    JwtStrategy,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
