import { AppDataSource } from "../db/data-source";
import { Comment } from '../entities/comment';
import { Post } from "../entities/post";
import { User } from "../entities/user";

const postRepo = AppDataSource.getRepository(Post)
const userRepo = AppDataSource.getRepository(User)
const commentRepo = AppDataSource.getRepository(Comment)

export const createComment = async (req: any, res: any) => {
    try {

        const { content, post_id } = req?.body;
        const user = await userRepo.findOneBy({ id: req.user?.userId })
        const post = await postRepo.findOneBy({ id: post_id })



        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        if (!post) {
            return res.status(404).json({ message: "user not found" })
        }
        console.log("call hit", req.user?.userId, user);

        const newComment = commentRepo.create({ author: user, content: content, Post: post })
        await commentRepo.save(newComment)
        res.status(201).json(newComment)

    } catch (error: any) {
        console.log(error);

        res.status(500).json({ message: "internal server error" })
    }
}

export const getAllComment = async (req: any, res: any) => {
    try {

        const data: any = await commentRepo.find({ where: { Post: { id: req?.params?.id } } })
        res.status(200).json(data)

    } catch (error: any) {
        console.log(error);

        res.status(500).json({ message: "internal server error" })
    }
}