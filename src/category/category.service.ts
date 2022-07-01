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

  async createCategory() {}
}