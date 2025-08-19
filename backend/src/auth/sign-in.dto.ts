import { IsString } from 'class-validator';
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
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export default SignInDto;
