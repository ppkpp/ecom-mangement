import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
    //return this.authService.validateUser(authPayload);
  }
}
