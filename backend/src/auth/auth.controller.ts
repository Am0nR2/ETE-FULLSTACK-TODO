import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { CurrentUser } from './decorators';
import { JwtAuthGuard } from './guard';
import { CurrentUserInterface } from './interfaces/interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() body: RegisterUserDto) {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  async loginUser(@Body() body: LoginUserDto) {
    return await this.authService.loginUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: CurrentUserInterface) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateUser(
    @CurrentUser() currentUser: CurrentUserInterface,
    @Body() body: UpdateUserDto,
  ) {
    return await this.authService.findUserAndUpdate(currentUser, body);
  }
}
