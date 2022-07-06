import {Table, Column, AutoIncrement, DataType, Model, PrimaryKey} from "sequelize-typescript";

export interface IUpload {
    id: number;
    filename: string;
    path: string;
    mimetype: string;
}

@Table({
    tableName: "Upload"
})

export class Upload extends Model<IUpload> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column({
        type: DataType.STRING,
    })
    filename: string;

    @Column({
        type: DataType.STRING,
    })
    path: string;

    @Column({
        type: DataType.STRING,
    })
    mimetype: string;
}