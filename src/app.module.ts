import { UserAnswers, Question, Form, CompletedTest, Answer } from './entities';
import { Token } from './users/entities/token.entity';
import { User } from './users/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { FormModule } from './form/form.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Token, Answer, CompletedTest, Form, Question, UserAnswers],
      autoLoadModels: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        defaults: {
          from: `user ${process.env.SMTP_USER}`,
        },
      },
    }),
    UsersModule,
    AuthModule,
    FormModule,
    AnswerModule,
  ],
})
export class AppModule {}
