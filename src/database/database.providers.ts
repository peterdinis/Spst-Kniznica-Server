import { Sequelize } from 'sequelize-typescript';
import { Admin } from '../admin/admin.entity';
import { Book } from '../book/book.entity';
import { Category } from '../category/category.entity';
import { User } from '../users/user.entity';

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
          sequelize.addModels([Book, Category, User, Admin]);
          await sequelize.sync();
          return sequelize;
        },
      },
]