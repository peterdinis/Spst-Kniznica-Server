import {IsString, IsNotEmpty, IsEmail} from "class-validator"
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

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