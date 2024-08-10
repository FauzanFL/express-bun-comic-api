import express from 'express'
import { createComic, deleteComic, getAllComics, getComicById, searchComic, updateComic } from '../controllers/comicController';

const comicRouter = express.Router();

comicRouter.get("/", getAllComics);
comicRouter.get("/:id", getComicById);
comicRouter.get("/search", searchComic);
comicRouter.post("/", createComic);
comicRouter.put('/:id', updateComic);
comicRouter.delete('/:id', deleteComic);

export default comicRouter;