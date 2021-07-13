import { CreateUserDto } from './../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
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
  logout() {
    return this.authService.logout();
  }

  @Get('/activate/:link')
  async activate(@Param() params, @Res() res) {
    console.log('====================================');
    console.log(params.link);
    console.log('====================================');
    await this.authService.activate(params.link);
    return res.redirect('https://google.com');
  }

  @Get('/refresh')
  refresh() {
    return this.authService.refresh();
  }
}
