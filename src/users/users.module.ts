import { Module, Logger } from '@nestjs/common';
import { UsersController } from './users.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from './../database/database.module';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';
import {ConfigModule} from "@nestjs/config"
import { ClsService } from 'nestjs-cls';

@Module({
    imports: [DatabaseModule, ConfigModule],
    controllers: [UsersController],
    providers: [ClsService, UsersService, ...userProviders, JwtStrategy],
    exports: [...userProviders],
})
export class UsersModule {}