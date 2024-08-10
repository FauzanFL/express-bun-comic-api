import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getAllComics = async (req: express.Request, res: express.Response) => {
    try {
        const comics = await prisma.comic.findMany();
        res.status(200).send({data: comics});
    }catch(e) {
        console.log(e)
        res.status(500).send({errors: { message: "Internal Server Error"}})
    }
}