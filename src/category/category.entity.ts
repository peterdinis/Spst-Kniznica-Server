import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    Unique,
    Length,
} from 'sequelize-typescript';

@Table({
    tableName: "categories"
})


export class Category extends Model<Category> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column({
        type: DataType.STRING
    })
    @Length({
        min: 3
    })
    name: string;
    
    @Column({
        type: DataType.STRING
    })
    @Length({
        min: 3
    })
    description: string;
}