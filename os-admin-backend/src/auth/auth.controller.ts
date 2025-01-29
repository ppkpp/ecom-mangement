import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { RefreshAuthGuard } from './guards/refresh.guard';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
    //return this.authService.validateUser(authPayload);
  }

  @Post('refresh-token')
  @UseGuards(RefreshAuthGuard)
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req.user);
  }
}
