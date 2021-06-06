import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOne(@Request() req) {
    const userData = await this.usersService.findOneById(req.user.id);
    return new UserEntity(userData['dataValues']);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Put('me')
  //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.usersService.update(+id, updateUserDto);
  //   }
}
