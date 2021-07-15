import { Answer } from './answer.entity';
import { User } from './../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

interface UserAnswersCreationAttributes {
  userId: number;
  formId: number;
  rightAnswers: number;
  wrongAnswers: number;
}

@Table({ tableName: 'user_answers' })
export class UserAnswers extends Model<
  UserAnswers,
  UserAnswersCreationAttributes
> {
  @ApiProperty({
    example: '666',
    description: 'Autoincrement Primary key',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Answer)
  answer: Answer;

  @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  answerId: number;

  @ApiProperty({
    example: 'Ken Thompson',
    description:
      'User answer to question. Make sence only if question type is input',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  value: string;
}
