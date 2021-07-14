import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'example@test.com', description: 'Email adress' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'password' })
  @IsNotEmpty()
  @MinLength(8, {
    message:
      'Passwort is too short. Password must be between 8 and 32 characters long.',
  })
  @MaxLength(32, {
    message:
      'Passwort is too long. Password must be between 8 and 32 characters long.',
  })
  readonly password: string;

  @ApiProperty({ example: 'asdasdas', description: 'activationLink' })
  readonly activationLink?: string;
}
