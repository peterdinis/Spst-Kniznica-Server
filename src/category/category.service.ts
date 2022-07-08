import { Injectable, Inject, Logger } from '@nestjs/common';
import { CategoryRepository } from './category.constants';
import {Category} from "./category.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(@Inject(CategoryRepository) private readonly categoryRepository: typeof Category) {}
  private readonly logger = new Logger(CategoryService.name);
  async allCategories() {
    const categories = await this.categoryRepository.findAll({});
    this.logger.log("Find all categories from db");
    return categories;
  }

  async createCategory(createData: CreateCategoryDto) {
    const category = new Category();
    category.name = createData.name;
    category.description = createData.description;

    this.logger.log("Create new category");
    return category.save();
  }

  async updateCategory(id: string, updateData: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    });

    category.name = updateData.name || category.name;
    category.description = updateData.description || category.description;
    this.logger.log("Update category by id")
    return category.save();
  }

  async removeCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    })

    await category.destroy();
    this.logger.log("Remove category");
    return category
  }
}