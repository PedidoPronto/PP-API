import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { SignUpDto } from '../dtos/sign-up-dto';
import { BcryptHasher } from '../../infrastructure/cryptography/bcrypt-hasher';

@Injectable()
export class SignUpUseCase {
  constructor(
    private prisma: PrismaService,
    private hasher: BcryptHasher,
  ) {}

  async execute(userData: SignUpDto): Promise<void> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (userExists) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await this.hasher.hash(userData.password);

    await this.prisma.user.create({
      data: {
        ...userData,
        password_hash: hashedPassword,
        must_change_password: false,
        role: 'ADMIN',
      },
    });
  }
}
