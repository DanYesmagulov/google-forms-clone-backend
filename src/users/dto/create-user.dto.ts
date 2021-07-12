import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'example@test.com', description: 'Email adress' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'password' })
  readonly password: string;
}
