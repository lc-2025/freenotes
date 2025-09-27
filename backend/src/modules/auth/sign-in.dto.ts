import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { ISignIn } from './types/auth.type';

/**
 * @description Authentication login Data Transfer Object class
 * Defines the authentication login request payload
 * @author Luca Cattide
 * @date 19/08/2025
 * @class SignInDto
 * @implements {ISignIn}
 */
class SignInDto implements ISignIn {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}

export default SignInDto;
