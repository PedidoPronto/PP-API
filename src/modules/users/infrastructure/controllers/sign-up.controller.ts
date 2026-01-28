import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignUpDto } from '../../application/dtos/sign-up-dto';
import type { Response } from 'express';
import { SignUpUseCase } from '../../application/use-cases/sign-up-use-case';

@Controller('auth/sign-up')
export class SignUpController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  @Post('')
  async signUp(@Body() signUpData: SignUpDto, @Res() res: Response) {
    try {
      const result = await this.signUpUseCase.execute(signUpData);

      return res.json({
        status: 'success',
        data: result,
        message: 'Sign up successful',
        code: res.status(201).statusCode,
      });
    } catch (error) {
      return res.json({
        status: 'error',
        message: error.message,
        code: res.status(400).statusCode,
      });
    }
  }
}
