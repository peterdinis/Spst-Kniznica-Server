import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {UserModule } from './user/user.module';
import {ScheduleModule} from "@nestjs/schedule";
import {BorrowingModule} from './borrowing/borrowing.module'

@Module({
  imports: [
    CategoryModule,
    BookModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    UserModule,
    BorrowingModule
  ],
})
export class AppModule {}
