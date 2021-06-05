import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  first_name: string;

  @IsString()
  @IsDefined()
  last_name: string;

  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
