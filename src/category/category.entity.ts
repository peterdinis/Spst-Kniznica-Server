import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model
} from 'sequelize-typescript';

export interface ICategory {
    id: number;
    name: string;
    description: string;
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
}