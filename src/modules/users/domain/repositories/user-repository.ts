import { User } from "../entities/user";

export abstract class UserRepository {
    abstract create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) : Promise<void>;
    abstract findByEmail(email: string) : Promise<User | null>;
    abstract findById(id: string) : Promise<User | null>;
    abstract save(user: User) : Promise<void>;
}