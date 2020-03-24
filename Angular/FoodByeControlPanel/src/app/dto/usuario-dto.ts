import { SafeUrl } from '@angular/platform-browser';

export class UsuarioDto {
    constructor(
        public id: string,
        public fullname: string,
        public phone: string,
        public email: string,
        public rol: string,
        public avatar: SafeUrl,
        public validated: boolean,
        public password: string,
        public created_date: Date,
        )
        {
    }
}