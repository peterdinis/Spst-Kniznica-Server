import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import { Book } from 'src/book/book.entity';
import { Category } from 'src/category/category.entity';
import { User } from 'src/users/user.entity';
import {ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_DB"),
                entities: [Book, Category, User, Admin],
                synchronize: true,
            })
        })
    ]
})
export class DatabaseModule {}