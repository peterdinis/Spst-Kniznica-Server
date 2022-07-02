import { Book } from "./book.entity";

export const bookProviders = [{
    provide: "BookRepository",
    useValue: Book
}]