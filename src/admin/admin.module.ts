import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { CaslAbilityFactory } from "./casl/casl-ability.factory";

@Module({
    controllers: [AdminController],
    providers: [AdminService, CaslAbilityFactory],
    exports: [CaslAbilityFactory]
})

export class AdminModule {}