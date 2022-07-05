import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString,} from 'class-validator';

export class UpdateAdminDto {
    @ApiProperty()
    @IsOptional()
    readonly email?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly password?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly firstName?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly status?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly lastName?: string;
}