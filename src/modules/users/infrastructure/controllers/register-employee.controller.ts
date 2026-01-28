import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterEmployeeUseCase } from '../../application/use-cases/register-emplotee-use-case';
import { RegisterEmployeeDto } from '../../application/dtos/register-employee-dto';
import type { Response } from 'express';

@Controller('/employees')
export class RegisterEmployeeController {
  constructor(private registerEmployeeUseCase: RegisterEmployeeUseCase) {}

  @Post('')
  async registerEmployee(
    @Body() employeeData: RegisterEmployeeDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    const result = await this.registerEmployeeUseCase.execute({
      ...employeeData,
    });

    return res.status(201).send(result);
  }
}
