import { Router } from "express";
import { createPost, deletePost, getall, getOne, update } from "../controller/post.controller";
import { createComment, getAllComment } from "../controller/comment.controller";


const router = Router()
router.post('/', createPost)
router.put('/:id', update)
router.get('/', getall)
router.get('/:id', getOne)
router.delete('/:id', deletePost)
router.post('/comment', createComment)
router.get('/comment/:id', getAllComment)



export default router



