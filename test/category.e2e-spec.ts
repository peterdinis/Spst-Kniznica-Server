import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Category e2e tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /categories', () => {
    it('Return all categories', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')
        .send()
        .expect(HttpStatus.OK);

      const data = response.body;
      console.log(data);
    });
  });
});
