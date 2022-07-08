import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    HasMany
} from 'sequelize-typescript';
import { Book } from '../book/book.entity';

export interface ICategory {
    id: number;
    name: string;
    description: string;
    books: any; // TODO: Remove any
}
@Table({
    tableName: "categories"
})

export class Category extends Model<ICategory> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column
    name: string;
    
    @Column
    description: string;

    @HasMany(() => Book)
    books: Book[];
}