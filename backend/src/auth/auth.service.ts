import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto, RegisterUserDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenInterface,
  CurrentUserInterface,
  PayloadInterface,
} from './interfaces/interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(body: RegisterUserDto): Promise<AccessTokenInterface> {
    body.password = await bcrypt.hash(body.password, 10);

    const user = await this.userRepository.create({ ...body });

    return await this.signToken({
      id: user.id,
    });
  }

  async loginUser(body: LoginUserDto): Promise<AccessTokenInterface> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!user)
      throw new NotFoundException('User with proven e-mail is not found...');

    const isPwMatches = await bcrypt.compare(body.password, user.password);

    if (!isPwMatches)
      throw new UnauthorizedException('Password is incorrect...');

    return await this.signToken({
      id: user.id,
    });
  }

  async findUserAndUpdate(
    currentUser: CurrentUserInterface,
    body: UpdateUserDto,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: currentUser.id,
      },
    });
    if (body.password) body.password = await bcrypt.hash(body.password, 10);
    await user.update(body);
    return user;
  }

  async signToken({ id }: PayloadInterface): Promise<AccessTokenInterface> {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
