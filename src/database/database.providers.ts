import { Sequelize } from 'sequelize-typescript';
import { Book } from 'src/book/book.entity';
import { Category } from 'src/category/category.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
          const sequelize = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'PETERdinis1234',
            database: 'spstapp',
          });
          sequelize.addModels([Book, Category]);
          await sequelize.sync();
          return sequelize;
        },
      },
]