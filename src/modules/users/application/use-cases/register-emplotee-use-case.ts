import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-repository';
import { Hasher } from '../../infrastructure/providers/hasher';
import { RegisterEmployeeDto } from '../dtos/register-employee-dto';
import { GeneratorPassword } from '../../infrastructure/providers/generator';

@Injectable()
export class RegisterEmployeeUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
    private passwordGenerator: GeneratorPassword,
  ) {}

  async execute(userData: RegisterEmployeeDto): Promise<HttpResponse> {
    const userExists = await this.userRepository.findByEmail(userData.email);

    if (userExists) throw new ConflictException('Email already in use');

    const temporaryPassword = this.passwordGenerator.generate(10)

    const hashedPassword = await this.hasher.hash(temporaryPassword);

    const newUser = this.userRepository.create({
      ...userData,
      password_hash: hashedPassword,
      must_change_password: true,
    })

    return {
      user: newUser,
      message: 'Employee registered successfully',
      
    }
  }
}
