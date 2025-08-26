import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { IUser } from './types/users.type';

/**
 * @description User Data Transfer Object class
 * Defines the user request payload
 * @author Luca Cattide
 * @date 17/08/2025
 * @class CreateUserDto
 * @implements {IUser}
 */
class CreateUserDto implements IUser {
  @ApiProperty()
  // @IsBoolean casting/transformation is bugged
  @IsString()
  acceptance: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}

export default CreateUserDto;
