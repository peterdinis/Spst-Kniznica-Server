import {Test} from "@nestjs/testing";
import {getModelToken} from "@nestjs/sequelize";
import {Book} from "../book.entity";
import { BookService } from "../book.service";

describe("BooksService", () => {
    let service: BookService;
    let model: typeof Book;

    let testBook = {
        name: "RTR",
        description: "PingPongScreet",
        author: "String",
        year: 2020,
        image: "https://www.google.com/search?q=google&sxsrf=ALiCzsY0H7i0nvu9VWxXoH1v012kQlHbig:1657306653240&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiWleay_On4AhUxMuwKHRjADYMQ_AUoAXoECAEQAw&biw=985&bih=927&dpr=1#imgrc=4J9ykC9cZ2HbMM",
        pages: 2020,
        avaiable: true
    }

    beforeEach(async () => {
        const modRef = await Test.createTestingModule({
            providers: [
                BookService,
                {
                    provide: getModelToken(Book),
                    useValue: {
                        findAll: jest.fn(() => [testBook]),
                        findOne: jest.fn(),
                        create: jest.fn(() => testBook),
                        remove: jest.fn(),
                    }
                }
            ]
        }).compile();
        service = modRef.get(BookService);
        model = modRef.get<typeof Book>(getModelToken(Book));
    })

    it("Should get the books", async() => {
        expect(await service.allBooks()).toEqual([testBook]);
    })

    it("Should add book", async() => {
       expect(await service.createBook(testBook)).toEqual(testBook);
    })
});