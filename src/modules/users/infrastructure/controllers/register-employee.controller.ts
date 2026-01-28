import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterEmployeeUseCase } from '../../application/services/register-employee-use-case';
import { RegisterEmployeeDto } from '../../application/dtos/register-employee-dto';
import type { Response } from 'express';
import { ResponseDto } from 'src/shared/dtos/response-dto';

@Controller('/employees')
export class RegisterEmployeeController {
  constructor(private registerEmployeeUseCase: RegisterEmployeeUseCase) {}

  @Post('')
  async registerEmployee(
    @Body() employeeData: RegisterEmployeeDto,
    @Res() res: Response,
  ): Promise<ResponseDto> {
    try {
      const result = await this.registerEmployeeUseCase.execute({
        ...employeeData,
      });

      return {
        status: 'success',
        data: result,
        message: 'Employee registered successfully',
        code: res.status(201).statusCode,
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
