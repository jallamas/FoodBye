import { SafeUrl } from '@angular/platform-browser';

export interface Usuario{
    id: string;
    fullname: string;
    phone: string;
    email: string;
    avatar: SafeUrl;
    rol: string;
    validated: boolean;
    created_date: Date;
    password:string;
}