export type UserRoleEnum = 'admin' | 'client';

export interface UserModel {
    id?: string;
    email: string;
    name: string;
    role: UserRoleEnum;
    createAt?: string;
}