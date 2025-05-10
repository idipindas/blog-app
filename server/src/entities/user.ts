import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";
import { Comment } from "./comment";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    username?: string

    @Column()
    password?: string;


    @OneToMany(() => Post, (p) => p.author)
    posts?: Post[]
    @OneToMany(() => Comment, (c) => c.author)

    comments?: Comment[]


}
