import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsEmail({}, { message: 'Please, provide a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak. Must include uppercase, lowercase, and a number or symbol',
  })
  password: string;
}
