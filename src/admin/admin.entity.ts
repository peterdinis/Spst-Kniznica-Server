import {
    Table,
    Column,
    Model,
    Unique,
    IsEmail,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
interface IAdmin {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

type AdminCreationAttributes = Optional<IAdmin, 'isAdmin'>;

@Table({
    tableName: "teachers"
})

export class Admin extends Model<IAdmin, AdminCreationAttributes> {
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

    @Column({ field: 'status'})
    status: string;

    @Column({
        type: DataType.BOOLEAN, 
        defaultValue: true
    })
    isAdmin: boolean;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}