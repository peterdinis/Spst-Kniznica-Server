import { Sequelize } from 'sequelize-typescript';
import { Book } from 'src/book/book.entity';
import { Category } from 'src/category/category.entity';
import { ConfigService } from './config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
           sequelize.addModels([Book, Category]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
]