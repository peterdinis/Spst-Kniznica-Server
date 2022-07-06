import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from './../database/database.module';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';
import { UploadsService } from '../uploads/uploads.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService, ...userProviders, JwtStrategy, UploadsService],
    exports: [...userProviders],
})
export class UsersModule {}