import { response } from "express";
import { AppDataSource } from "../db/data-source"
import { User } from "../entities/user"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userRepo = AppDataSource.getRepository(User)
export const register = async (req: any, res: any) => {

    try {

        const { username, password } = req?.body;

        const exsistingUser = await userRepo.findOneBy({ username })
        if (exsistingUser) {
            return res.status(400).json({ message: "user exsist" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = userRepo.create({ username: username, password: hashPassword })
        await userRepo.save(newUser

        )
        res.status(201).json({ message: "user created" })



    } catch (error: any) {
        res.staus(500).josn("Internam server Error")
    }

}

export const login = async (req: any, res: any) => {
    try {


        const { username, password } = req?.body;

        const exsistingUser: any = await userRepo.findOneBy({ username })
        if (!exsistingUser) {
            return res.status(400).json({ message: "user Not exsist" })
        }

        const isMatch = await bcrypt.compare(password, exsistingUser.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })

        }

        const token = jwt.sign({ userId: exsistingUser?.id }, "jwtsecret", { expiresIn: '1h' })



        res.status(201).json({ token })

    } catch (error: any) {
        res.staus(500).send("Internam server Error")
    }

}