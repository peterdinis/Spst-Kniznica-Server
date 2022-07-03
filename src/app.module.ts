import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { AdminGateway } from './admin/admin.gateway';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CategoryModule,
    BookModule,
    EventEmitterModule.forRoot()
    
  ],

  providers: [AdminGateway]
})
export class AppModule {}
