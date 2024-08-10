import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface comicRequest {
    title: string 
    author: string
    synopsys:string 
    genre:string 
    release: string
    status: string
}

export const getAllComics = async (req: express.Request, res: express.Response) => {
    try {
        const comics = await prisma.comic.findMany();
        res.status(200).send({data: comics});
    }catch(e) {
        console.log(e)
        res.status(500).send({errors: { message: "Internal Server Error"}})
    }
}

export const getComicById = async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    const idInt = parseInt(id);
    if (!id) {
        return res.status(400).send({errors: { message: "Comic ID is required"}})
    } else if (isNaN(idInt)) {
        return res.status(400).send({errors: { message: "Comic ID must be a number"}})
    }
    try {
        const comic = await prisma.comic.findUnique({
            where: {
                id: idInt
            }
        });
        if (!comic) {
            return res.status(404).send({errors: { message: "Comic not found"}})
        }
        res.status(200).send({data: comic});
    }catch(e) {
        console.log(e)
        res.status(500).send({errors: { message: "Internal Server Error"}})
    }
}

export const searchComic = async (req: express.Request, res: express.Response) => {
    const {title, genre} = req.query;
    try {
        const comics = await prisma.comic.findMany({
            where: {
                title: {
                    contains: title ? title.toString() : undefined
                },
                genre: {
                    contains: genre ? genre.toString() : undefined
                }
            }
        });
        res.status(200).send({data: comics});
    }catch(e) {
        console.log(e)
        res.status(500).send({errors: { message: "Internal Server Error"}})
    }
}


export const createComic = async (req: express.Request, res: express.Response) => {
    const {title, author, synopsys, genre, release, status} = req.body;
    const {isValid, message} = validation({title, author, synopsys, genre, release, status});
    if (!isValid) {
        return res.status(400).send({errors: { message }})
    }
    try {
        const comic = await prisma.comic.create({
            data: {
                title,
                author,
                synopsys,
                genre,
                release: new Date(release),
                status
            }
        });
        res.status(201).send({data: comic});
    }catch(e) {
        console.log(e)
        res.status(500).send({errors: { message: "Internal Server Error"}})
    }
}

export const updateComic = async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    const {title, author, synopsys, genre, release, status} = req.body;
    const idInt = parseInt(id);
    if (!id) {
        return res.status(400).send({errors: { message: "Comic ID is required"}})
    } else if (isNaN(idInt)) {
        return res.status(400).send({errors: { message: "Comic ID must be a number"}})
    }
    const {isValid, message} = validation({title, author, synopsys, genre, release, status});
    if (!isValid) {
        return res.status(400).send({errors: { message }})
    }
    try {
        const comic = await prisma.comic.update({
            where: {
                id: idInt
            },
            data: {
                title,
                author,
                synopsys,
                genre,
                release: new Date(release),
                status
            }
        });
        res.status(200).send({data: comic});
    }catch(e) {
        console.log(e)
        res.status(500).send({errors: { message: "Internal Server Error"}})
    }
}

export const deleteComic = async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    const idInt = parseInt(id);
    if (!id) {
        return res.status(400).send({errors: { message: "Comic ID is required"}})
    } else if (isNaN(idInt)) {
        return res.status(400).send({errors: { message: "Comic ID must be a number"}})
    }
    try {
        const comic = await prisma.comic.delete({
            where: {
                id: idInt
            }
        });
        res.status(200).send({data: comic});
    }catch(e) {
        console.log(e)
        res.status(500).send({errors: { message: "Internal Server Error"}})
    }
}

const validation = (data: comicRequest): {isValid:boolean, message: string} => {
    let isValid = true;
    const invalidFields = [];

    if (!data.title) {
        isValid = false;
        invalidFields.push("title");
    }
    if (!data.author) {
        isValid = false;
        invalidFields.push("author");
    }
    if (!data.synopsys) {
        isValid = false;
        invalidFields.push("synopsys");
    }
    if (!data.genre) {
        isValid = false;
        invalidFields.push("genre");
    }
    if (!data.release) {
        isValid = false;
        invalidFields.push("release");
    }
    if (!data.status) {
        isValid = false;
        invalidFields.push("status");
    }

    const message = `The following fields are required: ${invalidFields.join(", ")}`;
    return {isValid, message};
}