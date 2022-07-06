import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import {BorrowingModule} from "./borrowing/borrowing.module";
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
    BorrowingModule,
    SeederModule.forRoot({
      isGlobal: true
   })
  ]
})
export class AppModule {}
