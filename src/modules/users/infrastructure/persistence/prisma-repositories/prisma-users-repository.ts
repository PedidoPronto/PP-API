import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { User } from '../../../domain/entities/user';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { UserRepository } from 'src/modules/users/domain/repositories/user-repository';

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
      const data = PrismaUserMapper.toPrisma(user);

      await this.prisma.user.update({
        where: { id: data.id },
        data
      })

  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data
    });
  }
}
