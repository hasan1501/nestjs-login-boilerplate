import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { EMAIL_EXIST } from 'src/constants/errors.constants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async signUp(@Body() user: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(user.email);

    if (existingUser) {
      throw new HttpException(EMAIL_EXIST, HttpStatus.BAD_REQUEST);
    }
    return await this.authService.create(user);
  }
}
