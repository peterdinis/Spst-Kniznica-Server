import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { EmailsModule } from './emails/emails.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/admin.entity';
import { Book } from './book/book.entity';
import { Category } from './category/category.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Book, Category, User, Admin],
        synchronize: true,
      }),
    }),
    CategoryModule,
    BookModule,
    EventEmitterModule.forRoot(),
    AdminModule,
    UsersModule,
    EmailsModule,
    BorrowingModule,
    DatabaseModule,
  ],
})
export class AppModule {}
