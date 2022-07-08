import {Test} from "@nestjs/testing";
import {getModelToken} from "@nestjs/sequelize";
import { Category } from "../category.entity";
import {CategoryService} from "../category.service";

describe("CategoryService", () =>{
    let service:CategoryService;

    let testCategory = {
        name: 'TestCategory',
        description: 'TestDescription'
    }

    
})