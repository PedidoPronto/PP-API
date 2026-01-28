import { Controller, Post } from '@nestjs/common';
import { RegisterEmployeeUseCase } from '../../application/use-cases/register-emplotee-use-case';
import { RegisterEmployeeDto } from '../../application/dtos/register-employee-dto';
import type { Response } from 'express';

@Controller()
export class RegisterEmployeeController {
  constructor(private registerEmployeeUseCase: RegisterEmployeeUseCase) {}

  @Post('/employees')
  async registerEmployee(
    employeeData: RegisterEmployeeDto,
    res: Response,
  ): Promise<Response<string>> {
    const result = await this.registerEmployeeUseCase.execute({
      ...employeeData,
    });

    return res.status(201).send(result);
  }
}
