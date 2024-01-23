import { HttpException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SingUpDto } from './dto/sing-up.dto';
import { SingInDto } from './dto/sing-in.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(singInDto: SingInDto) {
    const user = await this.usersService.findOneByUsername(singInDto.username);
    
    if (!user) {
      throw new HttpException('Username does not exists', 409);
    }

    const userWithPass = await this.usersService.findOneByUsernameWithPassword(singInDto.username);
    
    const isPasswordValid = await bcrypt.compare(singInDto.password, userWithPass.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const userObject = await this.usersService.findOne(user.id);

    const roles = userObject.roles.map((role: Role) => role.name);

    const payload = { id: user.id, username: user.username, roles: roles};

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SingUpDto) {
    
    const user = await this.usersService.create(signUpDto);
    
    if (!user) {
      throw new HttpException('Error creating user', 500);
    }
    //return http status ok with message
    return {
      message: 'User created successfully',
      status: HttpStatus.OK,
    };
  }

  async getProfile(id: number) {
    
    const user = await this.usersService.findOne(id);

    return user;
  }
}