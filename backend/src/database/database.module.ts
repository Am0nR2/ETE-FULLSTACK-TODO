import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          username: configService.getOrThrow('POSTGRES_USER'),
          port: configService.getOrThrow('POSTGRES_PORT'),
          host: 'localhost',
          database: configService.getOrThrow('POSTGRES_DB'),
          password: configService.getOrThrow('POSTGRES_PASSWORD'),
          autoLoadModels: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
