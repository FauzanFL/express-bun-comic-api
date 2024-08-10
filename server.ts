import express from 'express';
import comicRouter from './routes/comics';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/comics', comicRouter);

app.get('/', (req, res) => {
    res.send("Welcome to comic API!");
});

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
})