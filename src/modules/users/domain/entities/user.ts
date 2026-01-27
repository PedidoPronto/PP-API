import { Role } from "./role";

export class User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: Role;
    must_change_password: boolean;
    created_at: Date;
}