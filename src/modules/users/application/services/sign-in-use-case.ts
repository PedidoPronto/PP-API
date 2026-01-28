import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { SignInDto } from '../dtos/sign-in-dto';
import { BcryptHasher } from '../../infrastructure/cryptography/bcrypt-hasher';

@Injectable()
export class SignInUseCase {
  constructor(private prisma: PrismaService, private bcrypt: BcryptHasher) {}

  async execute(userData: SignInDto): Promise<string> {
    const result = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!result) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.bcrypt.compare(
        userData.password,
        result.password_hash
    )

    if (!isPasswordValid) {
        throw new UnauthorizedException('Credentials are invalid')
    }

    return 'Sign-in successful';
  }
}
