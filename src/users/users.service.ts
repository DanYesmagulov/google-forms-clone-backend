import { Token } from './entities/token.entity';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Token) private tokenRepository: typeof Token,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, dto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getTokenByUserId(userId: number) {
    const user = await this.tokenRepository.findOne({ where: { userId } });
    return user;
  }

  async getUserByActivationLink(activationLink: number) {
    const user = await this.userRepository.findOne({
      where: { activationLink },
    });
    return user;
  }
}
