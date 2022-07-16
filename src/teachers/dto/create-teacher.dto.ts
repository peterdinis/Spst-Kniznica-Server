import { IsString, IsEmail, MinLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTeacherDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsString()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    readonly teacherCode: string;
}