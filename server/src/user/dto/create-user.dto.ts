import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/.*[0-9].*/, {
        message: 'password must contain at least one number',
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    fname: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    lname: string;
}
