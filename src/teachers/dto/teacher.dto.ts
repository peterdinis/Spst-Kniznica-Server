import {Teacher} from "./../teachers.entity";
import {ApiProperty} from "@nestjs/swagger";

export class TeacherDto {
    id: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly teacherCode: string;

    constructor(teacher: Teacher) {
        this.id = teacher.id;
        this.email = teacher.email;
        this.firstName = teacher.firstName;
        this.lastName = teacher.lastName;
        this.teacherCode = teacher.teacherCode;
    }
}