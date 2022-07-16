import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AdminController } from "./admin.controller";
import { AdminGateway } from "./admin.gateway";
import { adminProviders } from "./admin.providers";
import { AdminService } from "./admin.service";
import { JwtStrategy } from "./auth/jwt-strategy";

@Module({
    imports: [DatabaseModule],
    controllers: [AdminController],
    providers: [AdminGateway, AdminService, ...adminProviders, JwtStrategy],
    exports: [AdminGateway]
})

export class AdminModule {}