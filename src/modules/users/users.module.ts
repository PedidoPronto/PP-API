import { Module } from '@nestjs/common';
import { RegisterEmployeeController } from './infrastructure/controllers/register-employee.controller';
import { RegisterEmployeeUseCase } from './application/use-cases/register-employee-use-case';
import { UserRepository } from './domain/repositories/user-repository';
import { Hasher } from './domain/ports/hasher';
import { GeneratorPassword } from './domain/ports/generator';
import { PrismaUsersRepository } from './infrastructure/persistence/prisma-repositories/prisma-users-repository';
import { BcryptHasher } from './infrastructure/cryptography/bcrypt-hasher';
import { PasswordGenerator } from './infrastructure/cryptography/password-generator';
import { PrismaService } from './infrastructure/database/prisma.service';
import { SignUpUseCase } from './application/use-cases/sign-up-use-case';
import { SignInUseCase } from './application/use-cases/sign-in-use-case';
import { SignUpController } from './infrastructure/controllers/sign-up.controller';
import { SignInController } from './infrastructure/controllers/sign-in.controller';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [RegisterEmployeeController, SignUpController, SignInController],
  providers: [
    RegisterEmployeeUseCase,
    SignUpUseCase,
    SignInUseCase,
    {
      provide: Hasher,
      useClass: BcryptHasher,
    },
    {
      provide: GeneratorPassword,
      useClass: PasswordGenerator,
    },
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    PrismaService,
  ],
})
export class UsersModule {}
