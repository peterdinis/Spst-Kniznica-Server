import { Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import {categoryProviders} from "./category.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [CategoryController],
    providers: [CategoryService, ...categoryProviders],
    exports: [CategoryService, ...categoryProviders]
})

export class CategoryModule {}