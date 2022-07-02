import { Sequelize } from 'sequelize-typescript';
import { Book } from 'src/book/book.entity';
import { Category } from 'src/category/category.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
          const sequelize = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'nest',
          });
          sequelize.addModels([Book, Category]);
          await sequelize.sync();
          return sequelize;
        },
      },
]