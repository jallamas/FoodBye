import { Avatar } from './avatar.interface';

export interface Usuario{
    _id: string;
    fullname: string;
    phone: string;
    email: string;
    avatar: string;
    rol: string;
    validated: boolean;
    created_date: Date;
}