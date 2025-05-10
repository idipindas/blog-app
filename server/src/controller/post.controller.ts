import { AppDataSource } from "../db/data-source";
import { Post } from "../entities/post";
import { User } from '../entities/user';

const postRepo = AppDataSource.getRepository(Post)
const userRepo = AppDataSource.getRepository(User)
export const createPost = async (req: any, res: any) => {
    try {

        const { title, content } = req?.body;
        const user = await userRepo.findOneBy({ id: req.user?.userId })

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        console.log("call hit", req.user?.userId, user);

        const newPost = postRepo.create({ author: user, content, title })
        await postRepo.save(newPost)
        res.status(201).json(newPost)

    } catch (error: any) {
        console.log(error);

        res.status(500).json({ message: "internal server error" })
    }
}

export const update = async (req: any, res: any) => {
    try {
        const post = await postRepo.findOne({ where: { id: res?.params?.id } })
        if (!post) {
            return res.status(404).josn({ message: "post not available" })
        }
        const { title, content } = req?.body;
        const user = await userRepo.findOneBy({ id: req.user?.userId })
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        post.title = title
        post.content = content

        await postRepo.save(post)
        res.status(200).json(post)

    } catch (error: any) {
        res.status(500).json({ message: "internal server error" })
    }
}
export const getall = async (req: any, res: any) => {
    try {
        const data = await postRepo.find({ where: { author: { id: req?.user?.userId } }, relations: ["comments"] })
        res.status(200).json(data)

    } catch (error: any) {
        res.status(500).json({ message: "internal server error" })
    }
}
export const getOne = async (req: any, res: any) => {
    try {
        const data = postRepo.findOne({ where: { id: req?.params?.id } })
        res.status(200).json(data)

    } catch (error: any) {
        res.status(500).json({ message: "internal server error" })
    }
}
export const deletePost = async (req: any, res: any) => {
    try {
        const post = await postRepo.findOne({ where: { id: req?.params?.id } }


        )

        if (!post) {
            return res.status(404).json({ message: "post not fount" })

        }

        await postRepo.remove(post)
        res.status(201).json(post)

    } catch (error: any) {
        res.status(500).json({ message: "internal server error" })
    }
} 