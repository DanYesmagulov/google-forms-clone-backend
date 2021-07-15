import { Form } from 'src/entities/form.entity';
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

interface CompletedTestCreationAttributes {
  userId: number;
  formId: number;
  rightAnswers: number;
  wrongAnswers: number;
}

@Table({ tableName: 'completed_test' })
export class CompletedTest extends Model<
  CompletedTest,
  CompletedTestCreationAttributes
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

  @BelongsTo(() => Form)
  form: Form;

  @ForeignKey(() => Form)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  formId: number;

  @ApiProperty({
    example: '12',
    description: 'User right answers to form',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rightAnswers: number;

  @ApiProperty({
    example: '8',
    description: 'User wrong answers to form',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  wrongAnswers: number;
}
