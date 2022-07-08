import { Module, Logger } from '@nestjs/common';
import { UsersController } from './users.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from './../database/database.module';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';
import {ConfigModule} from "@nestjs/config"

@Module({
    imports: [DatabaseModule, ConfigModule, Logger],
    controllers: [UsersController],
    providers: [UsersService, ...userProviders, JwtStrategy],
    exports: [...userProviders],
})
export class UsersModule {}