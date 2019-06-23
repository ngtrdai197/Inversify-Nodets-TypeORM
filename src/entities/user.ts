import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    public id!: String;
    
    @Column({ type: "varchar", length: 24 })
    public username!: String;

    @Column({ type: "varchar", length: 24 })
    public password!: String;

    @Column({ type: "varchar" })
    public email!: String;

    @Column("varchar")
    public address: String;

    @Column("varchar")
    public fullName: String;
}
