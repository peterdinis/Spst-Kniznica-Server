import { Module } from "@nestjs/common";
import { AdminGateway } from "./admin.gateway";

@Module({
    controllers: [],
    providers: [ AdminGateway]
})

export class AdminModule {}