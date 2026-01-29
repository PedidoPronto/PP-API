import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Please, provide a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
