import {IsString, IsNotEmpty, IsEmail} from "class-validator"
import {ApiProperty} from "@nestjs/swagger";

export class ValidateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
   password: string;
}