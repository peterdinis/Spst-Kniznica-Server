import { Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';
import {ConfigModule} from "@nestjs/config"
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User]),ConfigModule],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy]
})
export class UsersModule {}