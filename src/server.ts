import express, { NextFunction, Request, Response } from 'express';
import db from './config/database.config';
import todoRouter from './todo/route/index';

const app = express();
const port = 9000;

app.use(express.json());

db.sync().then(() => {
    console.log('conect to db');
});

app.use('/api/v1', todoRouter);

app.listen(port, () => {
    console.log("server is running on port");
})