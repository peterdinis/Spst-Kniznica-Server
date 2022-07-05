import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { adminProviders } from "./admin.providers";
import { AdminService } from "./admin.service";

@Module({
    controllers: [AdminController],
    providers: [AdminService, ...adminProviders],
    exports: []
})

export class AdminModule {}