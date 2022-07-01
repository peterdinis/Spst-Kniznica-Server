import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {Category} from "./category.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(@Inject("CategoryRepository") private readonly categoryRepository: typeof Category) {}

  async allCategories() {
    const categories = await this.categoryRepository.findAll({});
    return categories;
  }

  async createCategory(createData: CreateCategoryDto) {
    const category = new Category();
    category.name = createData.name;
    category.description = createData.description;

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

    return category.save();
  }

  async removeCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    })

    await category.destroy();
    return category
  }
}