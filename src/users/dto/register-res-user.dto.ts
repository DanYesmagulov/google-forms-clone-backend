import { ApiProperty } from '@nestjs/swagger';
export class RegistrationResponceUserDto {
  readonly id: number;

  readonly email: string;

  readonly isActive: string;

  constructor(user) {
    this.id = user.id;

    this.email = user.email;

    this.isActive = user.isActive;
  }
}
