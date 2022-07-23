import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    Unique,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';

export interface IBook {
    id: number;
    name: string;
    description: string;
    author: string;
    year: number;
    pages: number;
    avaiable: boolean;
    categoryId: number;
    category: Category;
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

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;
}