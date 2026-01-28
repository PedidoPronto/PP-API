import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { SignInDto } from '../dtos/sign-in-dto';
import { Hasher } from '../../infrastructure/providers/hasher';

@Injectable()
export class SignInUseCase {
  constructor(private prisma: PrismaService, private bcrypt: Hasher) {}

  async execute(userData: SignInDto): Promise<string> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.bcrypt.compare(
        userData.password,
        userExists.password_hash
    )

    if (!isPasswordValid) {
        throw new UnauthorizedException('Credentials are invalid')
    }

    return 'Sign-in successful';
  }
}
