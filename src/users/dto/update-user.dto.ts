import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'qwerty', description: 'password' })
  readonly password: string;

  @ApiProperty({ example: 'asdasdas', description: 'activationLink' })
  readonly activationLink: string;

  @ApiProperty({ example: 'false', description: 'isActive' })
  readonly isActive: boolean;
}
