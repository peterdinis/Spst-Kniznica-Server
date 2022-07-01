import { Sequelize } from 'sequelize-typescript';

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