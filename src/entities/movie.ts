import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity({ name: "movies" })
export class Movie {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;
    @Column("nvarchar")
    public title!: string;
    @Column("int")
    public year!: number;
}