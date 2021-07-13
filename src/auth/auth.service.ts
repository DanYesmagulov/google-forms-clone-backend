import { RegistrationResponceUserDto } from './../users/dto/register-res-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './../users/entities/token.entity';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Token) private tokenRepository: typeof Token,
    @InjectModel(User) private userRepository: typeof User,
    private readonly mailerService: MailerService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateTokens(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'This email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const activationLink = uuid.v4();
    const user = await this.usersService.create({
      ...dto,
      activationLink,
      password: hashPassword,
    });

    await this.sendEmail(
      dto.email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`,
    );
    const tokens = await this.generateTokens(user);
    await this.saveToken(user.id, tokens.refreshToken);

    const userDto = new RegistrationResponceUserDto(user);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async generateTokens(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      isActive: user.isActive,
    };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '30m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  private async saveToken(userId, refreshToken) {
    const tokenData = await this.usersService.getTokenByUserId(userId);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.refreshToken;
    }
    console.log('====================================');
    console.log(userId);
    console.log(refreshToken);
    console.log('====================================');
    const token = await this.tokenRepository.create({ userId, refreshToken });
    return token;
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Email or password not correct',
    });
  }

  private async sendEmail(to, link) {
    await this.mailerService.sendMail({
      to,
      from: process.env.SMTP_USER,
      subject: 'Activate your account at ' + process.env.API_URL,
      text: 'asd',
      html: `
        <div>
          <h1>Activate your account</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }

  async activate(activationLink) {
    const user = await this.usersService.getUserByActivationLink(
      activationLink,
    );
    if (!user) {
      throw new Error('Authorization link not correct');
    }
    user.isActive = true;
    await this.userRepository.update(
      {
        isActive: true,
      },
      {
        where: { id: user.id },
      },
    );
  }

  async logout() {}

  async refresh() {}
}
