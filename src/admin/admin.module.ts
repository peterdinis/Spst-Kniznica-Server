import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminGateway } from "./admin.gateway";
import { AdminService } from "./admin.service";

@Module({
    controllers: [AdminController],
    providers: [ AdminGateway, AdminService]
})

export class AdminModule {}