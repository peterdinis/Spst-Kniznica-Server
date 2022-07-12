import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import { Book } from 'src/book/book.entity';
import { Category } from 'src/category/category.entity';
import { User } from 'src/users/user.entity';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: 'postgres',
            password: 'PETERdinis1234',
            database: 'spstapp',
            entities: [Book, Category, User, Admin],
            synchronize: true,
        })
    ]
})
export class DatabaseModule {}