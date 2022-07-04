import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    Unique,
} from 'sequelize-typescript';

export interface IBook {
    id: number;
    name: string;
    description: string;
    author: string;
    year: number;
    pages: number;
    avaiable: boolean;
}

@Table({
    tableName: "books"
})
export class Book extends Model<IBook> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique(true)
    @Column({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING
    })
    description: string;

    @Column({
        type: DataType.STRING
    })
    author: string;

    @Column({
        type: DataType.INTEGER
    })
    year: number;

    @Column({
        type: DataType.INTEGER
    })
    pages: number;

    @Column({
        type: DataType.BOOLEAN
    })
    avaiable: boolean;
}