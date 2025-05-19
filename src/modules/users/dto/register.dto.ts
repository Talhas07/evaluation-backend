import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  token: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
