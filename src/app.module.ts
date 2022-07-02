import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    CategoryModule,
    BookModule,
    EventEmitterModule.forRoot()
  ],
})
export class AppModule {}
