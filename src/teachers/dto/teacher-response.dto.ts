import { TeacherDto } from './teacher.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '../teachers.entity';

export class TeacherLoginResponseDto extends TeacherDto {
    @ApiProperty()
    token: string;

    constructor(teacher: Teacher, token?: string) {
        super(teacher);
        this.token = token;
    }
}