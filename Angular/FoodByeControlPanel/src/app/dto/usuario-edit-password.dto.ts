export class EditUserPasswordDto {
    constructor(
        public password: string,
        public newpassword: string,
        public newpasswordD: string,
        )
        {
    }
}