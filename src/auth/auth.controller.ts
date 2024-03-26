import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/sing-up.dto';
import { SingInDto } from './dto/sing-in.dto';
import { Public } from 'src/public.decorator';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveIterface } from 'src/common/interfaces/ative-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: SingInDto) {
    console.log('signInDto', signInDto);
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  signUp(@Body() signUpDto: SingUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('profile')
  @Auth(['admin']) // ATUH ES UN DECORADOR QUE JUNTA LOS DECORADORES DE ROLES Y AUTHGUARD. Revisar archivo auth.decorator.ts
  getProfile(@ActiveUser() user: UserActiveIterface) {
    return this.authService.getProfile(user.id);
  }
}
