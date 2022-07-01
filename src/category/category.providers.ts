import {Category} from "./category.entity";

export const categoryProviders = [{
    provide: "CategoryRepository",
    useValue: Category
}]