import { Avatar } from './avatar.interface';

export interface Usuario{
    id: string;
    fullname: string;
    phone: string;
    email: string;
    avatar: Avatar;
    rol: string;
    validated: boolean;
    created_date: Date;
}