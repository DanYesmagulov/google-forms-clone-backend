import { User } from './../users/entities/user.entity';
import { Token } from './../users/entities/token.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    SequelizeModule.forFeature([Token, User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
