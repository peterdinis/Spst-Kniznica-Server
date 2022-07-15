import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {}
    private readonly logger = new Logger(UsersService.name);

    async findAll() {
        const users = await this.usersRepository.findAll<User>();
        this.logger.log("Return all users");
        return users.map(user => new UserDto(user));
    }

    async getUser(id: string) {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            throw new HttpException(
                'User with given id not found',
                HttpStatus.NOT_FOUND,
            );
        }

        this.logger.log("Find user by id");
        return new UserDto(user);
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.findOne<User>({
            where: { email },
        });
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = new User();
            user.email = createUserDto.email.trim().toLowerCase();
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            const salt = await genSalt(10);
            user.password = await hash(createUserDto.password, salt);

            const userData = await user.save();

            // when registering then log user in automatically by returning a token
            const token = await this.signToken(userData);
            this.logger.log("New user was add to database");
            return new UserLoginResponseDto(userData, token);
        } catch (err) {

            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(userLoginRequestDto: UserLoginRequestDto) {
        const email = userLoginRequestDto.email;
        const password = userLoginRequestDto.password;

        const user = await this.usersRepository.findOne<User>({
            where: { email },
        });
        if (!user) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const token = await this.signToken(user);
        this.logger.log("User successfully logged in app");
        return new UserLoginResponseDto(user, token);
    }

    async logoutUser() {
        /* TODO: Later */
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        user.firstName = updateUserDto.firstName || user.firstName;
        user.lastName = updateUserDto.lastName || user.lastName;

        try {
            const data = await user.save();
            this.logger.log("User was updated")
            return new UserDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string) {
        const user = await this.usersRepository.findByPk<User>(id);
        await user.destroy();
        this.logger.log("User was deleted");
        return new UserDto(user);
    }

    async signToken(user: User) {
        const payload: JwtPayload = {
            email: user.email,
        };  
        const jwtKey = this.configService.get<string>('JWT_KEY');
        return sign(payload, jwtKey, {});
    }
}