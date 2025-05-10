import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title?: string

    @Column()
    content?: string;

    @ManyToOne(() => User, (u) => u.posts)
    author?: User

    @OneToMany(() => Comment, (c) => c.Post)
    comments?: Comment[]


}

