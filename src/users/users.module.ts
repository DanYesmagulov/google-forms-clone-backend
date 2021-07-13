import { Token } from './entities/token.entity';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Token])],
  exports: [UsersService],
})
export class UsersModule {}
