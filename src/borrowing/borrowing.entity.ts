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
import { Book } from '../book/book.entity';
import { User } from '../users/user.entity';

interface IBorrow {
    
}

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
        field: 'user_id'
    })
    userId: string

    @ForeignKey(() => Book)
    @Column({
        type: DataType.STRING,
        field: "book_id"
    })
    bookId: string;

    @BelongsTo(() =>User)
    user: User;

    @BelongsTo(() => Book)
    book: Book
}