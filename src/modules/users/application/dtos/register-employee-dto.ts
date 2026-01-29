import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsEmail({}, { message: 'Please, provide a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsEnum(['WAITER', 'CHEF'], { message: 'Role must be either WAITER or CHEF' })
  @IsNotEmpty({ message: 'Role should not be empty' })
  role: 'WAITER' | 'CHEF';
}
