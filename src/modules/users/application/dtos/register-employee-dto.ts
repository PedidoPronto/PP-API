export class RegisterEmployeeDto {
    name: string;
    email: string;
    role: 'ADMIN' | 'WAITER' | 'CHEF';
}