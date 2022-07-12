import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { EmailsModule } from './emails/emails.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CategoryModule,
    BookModule,
    EventEmitterModule.forRoot(),
    AdminModule,
    UsersModule,
    SeederModule.forRoot({
      isGlobal: true
   }),
   EmailsModule,
   BorrowingModule,
   DatabaseModule
  ]
})
export class AppModule {}
