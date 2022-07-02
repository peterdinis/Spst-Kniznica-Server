import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    Unique,
} from 'sequelize-typescript';

@Table({
    tableName: 'users'
})

export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column
    name: string

    @Column
    @Unique(true)
    email: string;

    @Column
    password: string;
}