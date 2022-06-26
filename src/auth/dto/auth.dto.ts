import {IsNotEmpty, IsString, IsEmail, Length} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class AuthDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @IsEmail()
    public email: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Length(3, 20, { message: 'Passowrd has to be at between 3 and 20 chars' })
    public password: string;
}