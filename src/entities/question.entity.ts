import { Form } from 'src/entities/form.entity';
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
import { Answer } from './answer.entity';

interface QuestionCreationAttributes {
  description: string;
  type: string;
  order: number;
  formId: number;
}

@Table({ tableName: 'question' })
export class Question extends Model<Question, QuestionCreationAttributes> {
  @ApiProperty({ example: '666', description: 'Autoincrement Primary key' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Who invented Golang?',
    description: 'Question',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'Question type',
    description: 'RADIO-BUTTON',
  })
  @Column({
    type: DataType.ENUM('CHECKBOX', 'RADIO-BUTTON', 'INPUT'),
    allowNull: false,
  })
  type: 'CHECKBOX' | 'RADIO-BUTTON' | 'INPUT';

  @ApiProperty({
    example: '1',
    description: 'Question order in form',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order: number;

  @BelongsTo(() => Form)
  form: Form;

  @ForeignKey(() => Form)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  formId: number;

  @HasMany(() => Answer)
  answer: Answer;
}
