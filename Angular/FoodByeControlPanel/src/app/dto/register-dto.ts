export class RegisterDto {
    constructor(
        public fullname: string,
        public telefono: string,
        public email: string,
        public rol: string,
        public avatar: string,
        public password: string,
        public passwordD: string,
        public grant_type: string) {
    }
}