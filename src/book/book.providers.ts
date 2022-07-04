import { Book } from "./book.entity";
import {BookRepository} from "./book.constants"

export const bookProviders = [{
    provide: BookRepository,
    useValue: Book
}]