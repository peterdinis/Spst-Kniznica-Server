import { Injectable, Inject, Logger, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.constants';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {

    constructor(
        @Inject(UserRepository)
        private readonly usersRepository: typeof User,
        private readonly configService: ConfigService,
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
            throw new NotFoundException(
                'User with given id not found',
            );
        }
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

            throw new InternalServerErrorException(err.message)
        }
    }

    async login(userLoginRequestDto: UserLoginRequestDto) {
        const email = userLoginRequestDto.email;
        const password = userLoginRequestDto.password;

        const user = await this.usersRepository.findOne<User>({
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

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }

        user.firstName = updateUserDto.firstName || user.firstName;
        user.lastName = updateUserDto.lastName || user.lastName;

        try {
            const data = await user.save();
            this.logger.log("User was updated")
            return new UserDto(data);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
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