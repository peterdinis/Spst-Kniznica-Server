import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Admin} from './admin.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { AdminDto } from './dto/admin.dto';
import { AdminLoginRequestDto } from './dto/admin-login-request.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminLoginResponseDto } from './dto/admin-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @Inject('AdminRepository')
        private readonly adminRepository: typeof Admin,
    ) {}

    async findAll() {
        const admins = await this.adminRepository.findAll<Admin>();
        return admins.map(admin => new AdminDto(admin));
    }

    async getAdmin(id: string) {
        const admin = await this.adminRepository.findByPk<Admin>(id);
        if (!admin) {
            throw new HttpException(
                'User with given id not found',
                HttpStatus.NOT_FOUND,
            );
        }
        return new AdminDto(admin);
    }

    async getUserByEmail(email: string) {
        return await this.adminRepository.findOne<Admin>({
            where: { email },
        });
    }

    async create(createAdminDto: CreateAdminDto) {
        try {
            const admin = new Admin();
            admin.email = createAdminDto.email.trim().toLowerCase();
            admin.firstName = createAdminDto.firstName;
            admin.lastName = createAdminDto.lastName;
            const salt = await genSalt(10);
            admin.password = await hash(createAdminDto.password, salt);

            const adminData = await admin.save();

            // when registering then log user in automatically by returning a token
            const token = await this.signToken(adminData);
            return new AdminLoginResponseDto(adminData, token);
        } catch (err) {

            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(adminLoginRequestDto: AdminLoginRequestDto) {
        const email = adminLoginRequestDto.email;
        const password = adminLoginRequestDto.password;

        const admin = await this.adminRepository.findOne<Admin>({
            where: { email },
        });
        if (!admin) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const isMatch = await compare(password, admin.password);
        if (!isMatch) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const token = await this.signToken(admin);
        return new AdminLoginResponseDto(admin, token);
    }

    async update(id: string, updateAdminDto: UpdateAdminDto) {
        const admin = await this.adminRepository.findByPk<Admin>(id);
        if (!admin) {
            throw new HttpException('admin not found.', HttpStatus.NOT_FOUND);
        }

        admin.firstName = updateAdminDto.firstName || admin.firstName;
        admin.lastName = updateAdminDto.lastName || admin.lastName;

        try {
            const data = await admin.save();
            return new AdminDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string) {
        const admin = await this.adminRepository.findByPk<Admin>(id);
        await admin.destroy();
        return new AdminDto(admin);
    }

    async signToken(admin: Admin) {
        const payload: JwtPayload = {
            email: admin.email,
        };

        return sign(payload, process.env.JWT_KEY as string, {});
    }
}