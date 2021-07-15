import { UserAnswers } from './user_answers.entity';
import { Question } from './question.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

interface AnswerCreationAttributes {
  value: string;
  correct: boolean;
  questionId: number;
}

@Table({ tableName: 'answer' })
export class Answer extends Model<Answer, AnswerCreationAttributes> {
  @ApiProperty({ example: '666', description: 'Autoincrement Primary key' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Ken Thompson',
    description: 'Question answer',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'true',
    description: 'Is this answer correct',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isCorrect: boolean;

  @BelongsTo(() => Question)
  question: Question;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number;

  @HasMany(() => UserAnswers)
  userAnswers: UserAnswers;
}
