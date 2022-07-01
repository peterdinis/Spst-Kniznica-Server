import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from './config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
           /*  sequelize.addModels([User, Post]); */
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
]