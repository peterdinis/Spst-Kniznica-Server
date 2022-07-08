import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import {User} from "../user.entity";
import {UsersService} from "../users.service";

describe('UserService', () => {
    let service: UsersService;
    let model: typeof User;

    
})