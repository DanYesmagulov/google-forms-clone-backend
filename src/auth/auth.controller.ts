import { CreateUserDto } from './../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Param, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(dto);

    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  }

  @Post('/registration')
  async registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.registration(dto);

    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  }

  @Post('/logout')
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies;
    const token = this.authService.logout(refreshToken);
    response.clearCookie('refreshToken');
    return token;
  }

  @Get('/activate/:link')
  async activate(@Param() params, @Res() res) {
    await this.authService.activate(params.link);
    return res.redirect('https://google.com');
  }

  @Get('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies;
    const user = await this.authService.refresh(refreshToken);

    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  }
}
