import { Module } from '@nestjs/common';
import {TeachersService} from "./teachers.service"
import {TeachersController} from "./teachers.controller"
import { teacherProviders } from './teachers.providers';
import { DatabaseModule } from '../database/database.module';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [TeachersController],
  providers: [TeachersService, ...teacherProviders, JwtStrategy],
})
export class TeachersModule {}
