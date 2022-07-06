import { Sequelize } from 'sequelize-typescript';
import { Borrow } from '../borrowing/borrowing.entity';
import { Admin } from '../admin/admin.entity';
import { Book } from '../book/book.entity';
import { Category } from '../category/category.entity';
import { User } from '../users/user.entity';
import {Upload} from "../uploads/upload.entity"
import { SEQUELIZE } from './database.constants';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
          const sequelize = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'PETERdinis1234',
            database: 'spstapp',
          });
          sequelize.addModels([Book, Category, User, Admin, Borrow]);
          await sequelize.sync();
          return sequelize;
        },
      },
]