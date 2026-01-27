import { User } from "../entities/user";

export abstract class UserRepository {
    abstract createUser(user: User) : Promise<void>;
    abstract findByEmail(email: string) : Promise<User | null>;
    abstract findById(id: string) : Promise<User | null>;
    abstract updateUser(user: User) : Promise<void>;
}