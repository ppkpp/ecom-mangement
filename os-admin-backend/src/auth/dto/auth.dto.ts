import { IsNotEmpty } from 'class-validator';

export class AuthPayloadDto {
  @IsNotEmpty({ message: 'Username is required.' })
  username: string;
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
