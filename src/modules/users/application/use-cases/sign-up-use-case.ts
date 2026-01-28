import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { SignUpDto } from '../dtos/sign-up-dto';
import { Hasher } from '../../infrastructure/providers/hasher';

@Injectable()
export class SignUpUseCase {
  constructor(
    private prisma: PrismaService,
    private hasher: Hasher,
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

    const {password, ...rest} = userData;

    const hashedPassword = await this.hasher.hash(password);

    await this.prisma.user.create({
      data: {
        ...rest,
        password_hash: hashedPassword,
        must_change_password: false,
        role: 'ADMIN',
      },
    });
  }
}
