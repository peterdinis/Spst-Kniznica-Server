import {Category} from "./category.entity";
import {CategoryRepository} from "./category.constants";

export const categoryProviders = [{
    provide: CategoryRepository,
    useValue: Category
}]