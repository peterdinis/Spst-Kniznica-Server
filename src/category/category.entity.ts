import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("categories")
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;
}