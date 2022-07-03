import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';

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
    
  ],
})
export class AppModule {}
