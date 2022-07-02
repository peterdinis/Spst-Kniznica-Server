import { Injectable, Inject } from "@nestjs/common";
import { ValidateUserDto } from "./dto/validate-user-dto";
import { User } from "./user.entity";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from "./dto/login-user-dto";
import {ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
    constructor(
        @Inject("UserRepository") private readonly userRepository: typeof User,
        private jwtService: JwtService,
        private configService: ConfigService
        ) {}

    async allUsers() {
        const users = await this.userRepository.findAll({});
        return users;
    }

    async validateUser(validateData: ValidateUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: validateData.email,
                password: validateData.password
            }
        })

        if(user && user.password === validateData.password) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async loginUser(loginData: LoginUserDto) {
        const payload = {
            email: loginData.email,
            password: loginData.password
        }

        return {
            access_token: this.jwtService.sign(payload),
          };
    }
}