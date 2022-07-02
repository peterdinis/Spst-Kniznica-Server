import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserController } from "./user.controller";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders, LocalStrategy],
})

export class UserModule {}