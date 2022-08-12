import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  role: string;

  @IsString()
  user: string;

  @IsString()
  password: string;
}
