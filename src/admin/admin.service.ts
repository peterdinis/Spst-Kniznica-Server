import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {Admin} from "./admin.entity";
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        @Inject('AdminRepository')
        private readonly adminRepository: typeof Admin,
    ) {}
}