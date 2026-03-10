import { ConflictException, Injectable } from '@nestjs/common';

import { Hasher } from '../../domain/ports/hasher';
import { RegisterEmployeeDto } from '../dtos/register-employee-dto';
import { GeneratorPassword } from '../../domain/ports/generator.js';
import { UserRepository } from '../../domain/repositories/user-repository.js';

@Injectable()
export class RegisterEmployeeUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
    private passwordGenerator: GeneratorPassword,
  ) {}

  async execute(userData: RegisterEmployeeDto): Promise<string> {
    const employeeExists = await this.userRepository.findByEmail(userData.email);

    if (employeeExists) throw new ConflictException('Email already in use');

    const temporaryPassword = this.passwordGenerator.generate(10);

    const hashedPassword = await this.hasher.hash(temporaryPassword);

    const newUser = this.userRepository.create({
      ...userData,
      password_hash: hashedPassword,
      must_change_password: true,
    });

    console.log(temporaryPassword)

    return temporaryPassword;
  }
}
