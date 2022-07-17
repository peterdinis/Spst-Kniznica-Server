import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { TeacherLoginRequestDto } from "./dto/teacher-login-request.dto";
import { TeachersService } from "./teachers.service";

@ApiTags("Teachers")
@Controller("teachers") 
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {}

    @ApiOperation({
        summary: "Register new teacher"
    })
    @Post("/register")
    @ApiCreatedResponse()
    register(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teachersService.create(createTeacherDto);
    }


    @ApiOperation({
        summary: "Teacher login to app"
    })
    @ApiCreatedResponse()
    login(
        @Body() teacherLoginRequestDto: TeacherLoginRequestDto
    ) {
        return this.teachersService.login(teacherLoginRequestDto);
    }


    @ApiOperation({
        summary: "Finding all teachers"
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse()
    @Get()
    findAll() {
        return this.teachersService.findAll();
    }

    /* @ApiOperation({
        summary: "My Teacher Profile"
    })
    @Get("me")
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse()
    async getTeacher(
        @Req() request
    ) {
        return this.teachersService.getTeacher(request.user.id)
    } */

}