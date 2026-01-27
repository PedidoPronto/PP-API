
export class User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: 'ADMIN' | 'WAITER' | 'CHEF';
    must_change_password: boolean;
    created_at: Date;
    updated_at: Date;
}