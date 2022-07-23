import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { HealthModule } from './health/health.module';
import { CaslModule } from './common/casl/casl.module';
import { TeachersModule } from './teachers/teachers.module';
import { ClsModule } from 'nestjs-cls';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ChatModule,
    CategoryModule,
    BookModule,
    EventEmitterModule.forRoot(),
    AdminModule,
    UsersModule,
    BorrowingModule,
    HealthModule,
    CaslModule,
    TeachersModule,
    ClsModule.register({
      global: true,
      middleware: { mount: true },
  }),
  ],
})
export class AppModule {}
