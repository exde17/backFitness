import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateMonitorDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'La contraseña debe tener una Letra Mayuscula una Minuiscula y un Numero',
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    readonly rol: string;

    // // rol es array
    // @IsString()
    // @IsNotEmpty()
    // role: string[];

}