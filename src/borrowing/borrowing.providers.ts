import { BorrowingRepository } from "./borrowing.constants";
import {Borrow} from "./borrowing.entity";

export const borrowingProviders = [{
    provide: BorrowingRepository,
    useValue: Borrow
}]