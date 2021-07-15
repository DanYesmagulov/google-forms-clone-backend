import { CompletedTest } from './../../entities/completed_test.entity';
import { UserAnswers } from './../../entities/user_answers.entity';
import { Token } from './token.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Form } from 'src/entities/form.entity';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@test.com', description: 'Email adress' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'false', description: 'user activ' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @ApiProperty({ example: 'asd', description: 'activation link' })
  @Column({
    type: DataType.STRING,
  })
  activationLink: string;

  @HasOne(() => Token)
  token: Token;

  @HasMany(() => Form)
  form: Form;

  @HasMany(() => UserAnswers)
  userAnswers: UserAnswers;

  @HasMany(() => CompletedTest)
  completedTest: CompletedTest;
}
