import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-repository';
import { Hasher } from '../../infrastructure/providers/hasher';
import { RegisterEmployeeDto } from '../dtos/register-employee-dto';

@Injectable()
export class RegisterEmployeeUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute(userData: RegisterEmployeeDto) {
    const userExists = await this.userRepository.findByEmail(userData.email);

    if (userExists) throw new ConflictException('Email already in use');

    const 
  }
}
