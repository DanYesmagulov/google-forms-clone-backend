import { CompletedTest } from './completed_test.entity';
import { Question } from './question.entity';
import { User } from '../users/entities/user.entity';
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

interface FormCreationAttributes {
  title: string;
  authorId: number;
}

@Table({ tableName: 'form' })
export class Form extends Model<Form, FormCreationAttributes> {
  @ApiProperty({ example: '666', description: 'Autoincrement Primary key' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Golang quiz for developers',
    description: 'Title for created forms',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId: number;

  @HasMany(() => Question)
  question: Question;

  @HasMany(() => CompletedTest)
  completedTest: CompletedTest;
}
