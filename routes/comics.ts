import express from 'express'
import { getAllComics } from '../controllers/comicController';

const comicRouter = express.Router();

comicRouter.get("/", getAllComics)

export default comicRouter;