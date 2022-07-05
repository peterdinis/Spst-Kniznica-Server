import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    Unique,
    HasOne,
} from 'sequelize-typescript';
import { Borrow } from 'src/borrowing/borrowing.entity';

export interface IBook {
    id: number;
    name: string;
    description: string;
    author: string;
    year: number;
    pages: number;
    avaiable: boolean;
    borrowedTime: Date,
    borrowedBook: any;
}

export type IBookId = Pick<IBook, 'id'>;

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

    @Column({
        type: DataType.DATE
    })
    borrowedTime: Date

    @HasOne(() =>Borrow)
    borrowedBook: Borrow
}