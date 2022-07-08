import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Category } from '../category.entity';
import { CategoryService } from '../category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let model: typeof Category;

  let testCategory = {
    name: 'TestCategory',
    description: 'TestDescription',
  };

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category),
          useValue: {
            findAll: jest.fn(() => [testCategory]),
            findOne: jest.fn(),
            create: jest.fn(() => testCategory),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    service = modRef.get(CategoryService);
    model = modRef.get<typeof Category>(getModelToken(Category));
  });

  it('Should get the categories', async () => {
    expect(await service.allCategories()).toEqual([testCategory]);
  });
});
