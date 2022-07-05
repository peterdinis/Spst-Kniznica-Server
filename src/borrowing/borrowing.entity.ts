import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model
} from 'sequelize-typescript';


@Table({
    tableName: "borrowers"
})

export class Borrow extends Model<Borrow> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column({
        type: DataType.INTEGER
    })
    quantity: number;
}