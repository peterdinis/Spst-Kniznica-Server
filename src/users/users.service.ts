import { Injectable, HttpException, HttpStatus, Logger, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
        const users = await this.usersRepository.find();
        this.logger.log("Return all users");
        return users.map(user => new UserDto(user));
    }

    async getUser(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                id
            }
        });
        if (!user) {
            throw new NotFoundException(
                'User with given id not found'
            );
        }

        this.logger.log("Find user by id");
        return new UserDto(user);
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.findOne({
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

            const userData = await this.usersRepository.create(createUserDto);

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

        const user = await this.usersRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new BadRequestException(
                'Invalid email or password.',
            );
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestException(
                'Invalid email or password.',
            );
        }

        const token = await this.signToken(user);
        this.logger.log("User successfully logged in app");
        return new UserLoginResponseDto(user, token);
    }

    async logoutUser() {
        /* TODO: Later */
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    id
                }
            });
            if (!user) {
                throw new NotFoundException('User not found.');
            }
            this.logger.log("User was updated")
            const data: any = await this.usersRepository.update(id, updateUserDto);
            return new UserDto(data);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async delete(id: number) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    id
                }
            });
            if(!user) {
                throw new NotFoundException("User not found with this id")
            }
            this.logger.log("Removing user...");
            await this.usersRepository.remove(user);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async signToken(user: User) {
        const payload: JwtPayload = {
            email: user.email,
        };  
        const jwtKey = this.configService.get<string>('JWT_KEY');
        return sign(payload, jwtKey, {});
    }
}