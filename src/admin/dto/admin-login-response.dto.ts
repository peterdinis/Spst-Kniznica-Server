import { AdminDto } from './admin.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '../admin.entity';

export class AdminLoginResponseDto extends AdminDto {
    @ApiProperty()
    token: string;

    constructor(admin: Admin, token?: string) {
        super(admin);
        this.token = token;
    }
}