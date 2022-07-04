import {User} from "./user.entity";
import { UserRepository } from "./users.constants";

export const userProviders = [{
    provide: UserRepository,
    useValue: User
}]