import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
