import { IsNumber, IsString, IsBoolean, IsNotEmpty } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    author: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    image: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    year: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    pages: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    avaiable: boolean;

    
}