import { Module } from '@nestjs/common';
import { RegisterEmployeeController } from './infrastructure/controllers/register-employee.controller';
import { RegisterEmployeeUseCase } from './application/use-cases/register-emplotee-use-case';
import { UserRepository } from './domain/repositories/user-repository';
import { Hasher } from './infrastructure/providers/hasher';
import { GeneratorPassword } from './infrastructure/providers/generator';
import { PrismaUsersRepository } from './infrastructure/persistence/prisma-repositories/prisma-users-repository';
import { BcryptHasher } from './infrastructure/cryptography/bcrypt-hasher';
import { PasswordGenerator } from './infrastructure/cryptography/password-generator';
import { PrismaService } from './infrastructure/database/prisma.service';

@Module({
  imports: [],
  controllers: [RegisterEmployeeController],
  providers: [
    RegisterEmployeeUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: Hasher,
      useClass: BcryptHasher,
    },
    {
      provide: GeneratorPassword,
      useClass: PasswordGenerator,
    },
    PrismaService
  ],
})
export class UsersModule {}
