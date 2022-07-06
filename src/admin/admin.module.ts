import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AdminController } from "./admin.controller";
import { adminProviders } from "./admin.providers";
import { AdminService } from "./admin.service";
import { JwtStrategy } from "./auth/jwt-strategy";

@Module({
    imports: [DatabaseModule],
    controllers: [AdminController],
    providers: [AdminService, ...adminProviders, JwtStrategy],
    exports: []
})

export class AdminModule {}