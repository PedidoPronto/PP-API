import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInDto } from '../../application/dtos/sign-in-dto';
import type { Response } from 'express';
import { SignInUseCase } from '../../application/services/sign-in-use-case';
import { ResponseDto } from 'src/shared/dtos/response-dto';

@Controller('auth/sign-in')
export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('')
  async signIn(
    @Body() signInData: SignInDto,
    @Res() res: Response,
  ): Promise<ResponseDto> {
    try {
      const result = await this.signInUseCase.execute(signInData);

      return {
        status: 'success',
        data: result,
        message: 'Sign in successful',
        code: res.status(200).statusCode,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
        code: res.status(400).statusCode,
      };
    }
  }
}
