import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
import {CategoryService} from "./category.service"
import {CreateCategoryDto} from "./dto/create-category.dto"
import {UpdateCategoryDto} from "./dto/update-category.dto";
import {ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse} from "@nestjs/swagger";

@ApiTags("Categories")
@Controller("category")
export class CategoryController {
    constructor(private readonly categoriesService: CategoryService) { }

    @ApiOperation({
        summary: "All Categories",
    })
    @ApiOkResponse()
    @Get("/")
    findAll() {
        return this.categoriesService.allCategories();
    }

    @ApiOperation({
        summary: "Create category"
    })
    @ApiCreatedResponse()
    @Post("/")
    createCategory(@Body() createData: CreateCategoryDto) {
        return this.categoriesService.createCategory(createData)
    }

    @ApiOperation({
        summary: "Update category"
    })
    @ApiOkResponse()
    @Patch("/:id")
    updateCategory(
        @Param("id") id: string,
        @Body() updateData: UpdateCategoryDto
    ) {
        return this.categoriesService.updateCategory(id, updateData);
    }

    @ApiOperation({
        summary: "Delete category"
    })
    @ApiOkResponse()
    @Delete("/:id")
    deleteCategory(@Param("id") id: string) {
        return this.categoriesService.removeCategory(id);
    }
}