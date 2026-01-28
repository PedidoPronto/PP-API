import { User as PrismaUser } from "@generated/prisma";
import { User as DomainUser } from "../../../domain/entities/user";

export class PrismaUserMapper {
    static toPrisma(domainUser: DomainUser): PrismaUser {
        return {
            ...domainUser
        }
    }

    static toDomain(prismaUser: PrismaUser): DomainUser {
        return {
            ...prismaUser
        }
    }
}