import { Admin } from '../admin.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AdminDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly status: string;

    constructor(admin: Admin) {
        this.id =admin.id;
        this.email =admin.email;
        this.firstName =admin.firstName;
        this.status = admin.status,
        this.lastName =admin.lastName;
    }
}