import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule,
    AuthModule, 
    AdminModule,
    BookModule,
    BorrowingModule
  ],
})
export class AppModule {}
