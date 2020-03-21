export class UsuarioDto {
    constructor(
        public _id: string,
        public fullname: string,
        public phone: string,
        public email: string,
        public rol: string,
        public avatar: string,
        public validated: boolean,
        public password: string,
        public created_date: Date,
        )
        {
    }
}