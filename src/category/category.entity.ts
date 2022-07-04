import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model
} from 'sequelize-typescript';

@Table({
    tableName: "categories"
})

interface ICategory {
    id: number;
    name: string;
    description: string;
}

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