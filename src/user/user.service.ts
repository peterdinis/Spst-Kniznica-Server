import { Injectable, Inject } from "@nestjs/common";
import { ValidateUserDto } from "./dto/validate-user-dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(@Inject("UserRepository") private readonly userRepository: typeof User) {}

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
}