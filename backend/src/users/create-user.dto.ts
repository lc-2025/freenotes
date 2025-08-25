import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { UUID } from 'mongodb';
import { Exclude } from 'class-transformer';
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
  @Exclude()
  @IsBoolean()
  acceptance: boolean;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export default CreateUserDto;
