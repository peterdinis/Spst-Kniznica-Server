import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    BelongsTo,
    ForeignKey
} from 'sequelize-typescript';
import { Book, IBook, IBookId } from '../book/book.entity';
import { IUser, IUserId, User } from '../users/user.entity';


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

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    })
    userId: string

    @BelongsTo(() =>User)
    user: User;
}