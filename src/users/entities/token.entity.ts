import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

interface TokenCreationAttributes {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'token' })
export class Token extends Model<Token, TokenCreationAttributes> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'asdads', description: 'refreshToken' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refreshToken: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
