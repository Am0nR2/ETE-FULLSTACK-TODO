import { DynamicModule, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {
  static jwtService(): DynamicModule {
    return {
      module: JwtModule,
      imports: [
        NestJwtModule.registerAsync({
          useFactory: (configService: ConfigService) => {
            return {
              secret: configService.getOrThrow('JWT_SECRET'),
              signOptions: {
                expiresIn: configService.getOrThrow('JWT_EXPIRE'),
              },
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [NestJwtModule],
    };
  }
}
