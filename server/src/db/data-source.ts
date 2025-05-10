import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Comment } from "../entities/comment";
import { Post } from "../entities/post";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "root",
    database: "blog",
    synchronize: true,
    logging: false,
    entities: [User, Comment, Post],
    migrations: [],
    subscribers: []
})