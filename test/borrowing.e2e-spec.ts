import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Book e2e tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  describe('GET /books', () => {
    it("Return all books", async() => {
      const response = await request(app.getHttpServer())
      .get('/books')
      .send()
      .expect(HttpStatus.OK);

    const data = response.body;
    console.log(data);
    })
  })

})

