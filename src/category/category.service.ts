import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import {Category} from "./category.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}
  
  private readonly logger = new Logger(CategoryService.name);
  async allCategories() {
    const categories = await this.categoryRepository.find();
    this.logger.log("Find all categories from db");
    return categories;
  }

  async createCategory(createData: CreateCategoryDto) {
    const newProduct = await this.categoryRepository.create(createData);
    return newProduct;
  }

  async updateCategory(id: number, updateData: UpdateCategoryDto) {
     try {
        const category = await this.categoryRepository.findOne({
          where: {
            id
          }
        });
        if(!category) {
          throw new NotFoundException("Category not found");
        }
        return await this.categoryRepository.update(id, updateData);
     } catch(error) {
      throw new BadRequestException(error);
     }
  }

  async removeCategory(id) {
    try {
      const category = await this.categoryRepository.findOneByOrFail(id);
      if(!category) {
        throw new NotFoundException("Category not found");
      }
      await this.categoryRepository.remove(category);
    } catch(error) {
      throw new BadRequestException(error);
    }
  }
}