import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {UserModule } from './user/user.module';

@Module({
  imports: [
    CategoryModule,
    BookModule,
    EventEmitterModule.forRoot(),
    UserModule
  ],
})
export class AppModule {}
