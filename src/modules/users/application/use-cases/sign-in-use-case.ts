import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { SignInDto } from '../dtos/sign-in-dto';
import { Hasher } from '../../infrastructure/providers/hasher';
import { UserPayloadDto } from '../../infrastructure/auth/dtos/payload';

@Injectable()
export class SignInUseCase {
  constructor(
    private prisma: PrismaService,
    private bcrypt: Hasher,
  ) {}

  async execute(
    userData: SignInDto,
  ): Promise<{
    id: string;
    email: string;
    role: string;
    must_change_password: boolean;
  }> {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.bcrypt.compare(
      userData.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      must_change_password: user.must_change_password,
    };
  }
}
