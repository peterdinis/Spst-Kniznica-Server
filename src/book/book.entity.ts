import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    Unique,
    HasOne,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { Borrow } from '../borrowing/borrowing.entity';

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
    categoryId: string;
    category: Category
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

    @HasOne(() =>Borrow)
    borrowedBook: Borrow[]

    @ForeignKey(() =>Category)
    @Column({
        type: DataType.STRING,
        field: 'category_id'
    })
    categoryId: string;

    @BelongsTo(() => Category)
    category: Category;
}