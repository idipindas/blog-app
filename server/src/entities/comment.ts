import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Post } from "./post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id?: number
    
    @Column()
    content?: string

    @ManyToOne(() => User, (u) => u.comments)
    author?: User;

    @ManyToOne(() => Post, (p) => p.comments)
    Post?: Post;
}