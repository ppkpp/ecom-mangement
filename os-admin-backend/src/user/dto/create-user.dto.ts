import { IsNotEmpty, IsBoolean, IsString, IsEnum } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required.' })
  @IsString({ message: 'Username must be a string.' })
  username: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsNotEmpty({ message: 'Phoneno is required.' })
  phoneno: string;

  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  upload_img: string;

  active: boolean;

  @IsNotEmpty({ message: 'Role is required.' })
  @IsEnum(Role, {
    message: `Role must be one of the following: ${Object.values(Role).join(', ')}`,
  })
  role: Role;
}
