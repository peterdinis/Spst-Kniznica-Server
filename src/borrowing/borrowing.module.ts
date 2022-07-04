import { Module } from "@nestjs/common";
import { BorrowingController } from "./borrowing.controller";
import { BorrowingService } from "./borrowing.service";

@Module({
     controllers: [BorrowingController],
     providers: [BorrowingService],
     exports: [BorrowingService]
})

export class BorrowingModule {}