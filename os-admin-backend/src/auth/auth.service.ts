import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from './types/current_user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async validateUser(authPayload: AuthPayloadDto) {
    const user = await this.userService.findByUsername(authPayload.username);

    if (!user) throw new UnauthorizedException();
    if (
      !this.userService.comparePasswords(authPayload.password, user.password)
    ) {
      throw new UnauthorizedException();
    }

    const { password, id, username, role, ...payload } = user;
    payload['id'] = id;
    return { data: this.jwtService.sign(payload), id, username, role };
  }

  async validateUserById(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    const currentUser: CurrentUser = { id: user.id, role: user.role };
    return currentUser;
  }
}
