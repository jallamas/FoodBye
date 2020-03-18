export class RegisterDto {
    constructor(
        public fullname: string,
        public phone: string,
        public email: string,
        public rol: string,
        public avatar: string,
        public password: string,
        public passwordD: string)
        {
    }
}