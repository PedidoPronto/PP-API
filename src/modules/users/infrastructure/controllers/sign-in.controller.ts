import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInDto } from '../../application/dtos/sign-in-dto';
import type { Response } from 'express';
import { SignInUseCase } from '../../application/use-cases/sign-in-use-case';
import { AuthService } from '../auth/auth.service';

@Controller('auth/sign-in')
export class SignInController {
  constructor(
    private signInUseCase: SignInUseCase,
    private authService: AuthService,
  ) {}

  @Post('')
  async signIn(@Body() signInData: SignInDto, @Res() res: Response) {
    try {
      const result = await this.signInUseCase.execute(signInData);

      if (result.must_change_password) {
        const tokens = await this.authService.generateBasicTokens(result);

        return res.json({
          status: 'success',
          data: tokens,
          message: 'You need to change your password',
          code: res.status(200).statusCode,
        });
      }

      const basicTokens = await this.authService.generateBasicTokens(result);

      const securityToken =
        await this.authService.generateSecurityToken(result);

      return res.json({
        status: 'success',
        data: { basicTokens, securityToken },
        message: 'Sign in successful',
        code: res.status(200).statusCode,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
        code: res.status(400).statusCode,
      });
    }
  }
}
