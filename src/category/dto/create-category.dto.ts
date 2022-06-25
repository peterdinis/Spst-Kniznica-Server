import {IsString, IsNotEmpty} from "class-validator";
import {ApiProperty}from "@nestjs/swagger";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string
}