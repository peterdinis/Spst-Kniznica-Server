import {
    Table,
    Column,
    Model,
    Unique,
    IsEmail,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
} from 'sequelize-typescript';
import { Borrow } from 'src/borrowing/borrowing.entity';

export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    borrowedBooks: any
}

export type IUserId = Pick<IUser, 'id'>;

@Table({
    tableName: 'students',
})


export class User extends Model<IUser> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column({ field: 'first_name' })
    firstName: string;

    @Column({ field: 'last_name' })
    lastName: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

    @HasMany(() => Borrow)
    borrowedBooks: Borrow[];
}