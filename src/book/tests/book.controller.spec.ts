import {Test} from "@nestjs/testing";
import {BookController} from "../book.controller";
import { BookService } from "../book.service";

let testBook = {
    id: 1,
    name: "RTR",
    description: "PingPongScreet",
    author: "String",
    year: 2020,
    image: "https://www.google.com/search?q=google&sxsrf=ALiCzsY0H7i0nvu9VWxXoH1v012kQlHbig:1657306653240&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiWleay_On4AhUxMuwKHRjADYMQ_AUoAXoECAEQAw&biw=985&bih=927&dpr=1#imgrc=4J9ykC9cZ2HbMM",
    pages: 2020,
    avaiable: true
}

describe("Book Controller tests", () => {
    let controller: BookController;
    let service: BookService;

    beforeEach(async () => {
        const modRef = await Test.createTestingModule({
            controllers: [BookController],
            providers: [
                {
                    provide: BookService,
                    useValue: {
                        getBooks: jest.fn(() => [testBook]),
                        addBook: jest.fn(() => testBook),
                        getBook: jest.fn().mockImplementation((id: number) => {
                            Promise.resolve({
                                name: "RTR",
                                description: "PingPongScreet",
                                author: "String",
                                year: 2020,
                                image: "https://www.google.com/search?q=google&sxsrf=ALiCzsY0H7i0nvu9VWxXoH1v012kQlHbig:1657306653240&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiWleay_On4AhUxMuwKHRjADYMQ_AUoAXoECAEQAw&biw=985&bih=927&dpr=1#imgrc=4J9ykC9cZ2HbMM",
                                pages: 2020,
                                avaiable: true,
                                id
                            })
                        }),
                        removeBook: jest.fn(),
                    }
                }
            ]
        }).compile();

        controller = modRef.get(BookController);
        service = modRef.get<BookService>(BookService)
    });
})