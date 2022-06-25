import { Injectable, Logger } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateCategoryDto} from "./dto/create-category.dto"
import {UpdateCategoryDto} from "./dto/update-category.dto"
@Injectable()
export class CategoryService {
    private logger = new Logger(CategoryService.name);

    constructor(private prismaService: PrismaService) { 

    }

    async create(createCategoryDto: CreateCategoryDto) {
        const result = await this.prismaService.category.create({ data: createCategoryDto });
        this.logger.log(`Category has been created : ${JSON.stringify(result)}`)
        return result
    }

    async allCategories() {
        const result = await this.prismaService.category.findMany();
        return result;
    }

    findOne(id: string) {
        return this.prismaService.category.findUnique({ where: { id } });
      }
    
      async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const result = await this.prismaService.category.update({
          data: updateCategoryDto,
          where: { id },
        });
        this.logger.warn(`Category has been updated : ${JSON.stringify(result)}`)
        return result
      }
    
      async remove(id: string) {
        const result = await this.prismaService.category.delete({ where: { id } });
        this.logger.warn(`Category has been deleted : ${JSON.stringify(result)}`)
        return result
      }
}