import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("books") 
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty()
  @Column()
  pages: number;

  @ApiProperty()
  @Column()
  avaiable: boolean;
}