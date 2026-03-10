import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpDto } from '../dtos/sign-up-dto';
import { Hasher } from '../../infrastructure/providers/hasher';
import { UserRepository } from '../../domain/repositories/user-repository';

@Injectable()
export class SignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute(userData: SignUpDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(userData.email);

    if (userExists) {
      throw new ConflictException('Email already in use');
    }

    const {password, ...rest} = userData;

    const hashedPassword = await this.hasher.hash(password);

    await this.userRepository.create({
      ...rest,
      password_hash: hashedPassword,
      must_change_password: false,
      role: 'ADMIN',
    })
  }
}
