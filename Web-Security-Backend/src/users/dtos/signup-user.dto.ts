import { IsString } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
