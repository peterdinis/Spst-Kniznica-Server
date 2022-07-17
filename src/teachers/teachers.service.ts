import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { compare, genSalt, hash } from "bcrypt";
import { UserLoginResponseDto } from "src/users/dto/user-login-response.dto";
import { JwtPayload } from "./auth/jwt-payload.model";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { TeacherDto } from "./dto/teacher.dto";
import { TeacherRepository } from "./teachers.constants";
import { Teacher } from "./teachers.entity";
import { sign } from 'jsonwebtoken';
import { TeacherLoginRequestDto} from "./dto/teacher-login-request.dto";
import { TeacherLoginResponseDto } from "./dto/teacher-response.dto";

@Injectable()
export class TeachersService {
    constructor(
        @Inject(TeacherRepository)
        private readonly teacherRepository: typeof Teacher,
        private readonly configService: ConfigService
    ) {}

    private readonly logger = new Logger(TeachersService.name);

    async findAll() {
        const teachers = await this.teacherRepository.findAll<Teacher>();
        this.logger.log("Return all loggged teachers");
        return teachers.map(teacher => new TeacherDto(teacher));
    }

    async findOneTeacher(id: string) {
        const teacher = await this.teacherRepository.findByPk<Teacher>(id);
        if(!teacher) {
            throw new NotFoundException("Teacher not found");
        }

        this.logger.log("Find teacher by id");
        return new TeacherDto(teacher);
    }

    async getTeacherByEmail(email: string) {
        return await this.teacherRepository.findOne<Teacher>(({
            where: { email}
        }))
    }

    async create(createTeacherDto: CreateTeacherDto) {
        try {
            const teacher = new Teacher();
            teacher.email = createTeacherDto.email.trim().toLowerCase();
            teacher.firstName = createTeacherDto.firstName;
            teacher.lastName = createTeacherDto.lastName;
            teacher.teacherCode = createTeacherDto.teacherCode;
            const salt = await genSalt(10);
            teacher.password = await hash(createTeacherDto.password, salt);
    
            const teacherData = await teacher.save();
            const token = await this.signToken(teacherData);
            this.logger.log("New Teacher was add to database");
            return new UserLoginResponseDto(teacherData, token);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async login(teacherLoginRequestDto: TeacherLoginRequestDto) {
        const email = teacherLoginRequestDto.email;
        const password = teacherLoginRequestDto.password;

        const teacher = await this.teacherRepository.findOne<Teacher>({
            where: { email }
        })

        if(!teacher) {
            throw new BadRequestException("Teacher not found");
        }

        const isMatch = await compare(password, teacher.password);
        if(!isMatch) {
            throw new BadRequestException("Invalid password or password");
        }

        const token = await this.signToken(teacher);
        return new TeacherLoginResponseDto(teacher, token);
    }


    async signToken(teacher: Teacher) {
        const payload: JwtPayload = {
            email: teacher.email
        }

        const jwtKey = this.configService.get<string>('JWT_KEY');
        return sign(payload, jwtKey, {});
    }
}