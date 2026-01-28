import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayloadDto } from './dtos/payload';
import { jwtSecrets } from 'src/shared/constants/constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateBasicTokens(
    user: UserPayloadDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtSecrets.access,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtSecrets.refresh,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

}
