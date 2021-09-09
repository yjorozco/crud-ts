import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TodoInstance } from '../model/index';



class TodoController {

    async create(req: Request, res: Response) {
        const id = uuidv4();
        try {
            const record = await TodoInstance.create({ ...req.body, id });

            return res.json({ record, msg: 'Successfully create todo' });
        } catch (e) {
            return res.json({ msg: "fail to create", status: 500, route: '/create' });
        }
    }

    async readPagination(req: Request, res: Response) {
        try {

            const limit = req.query?.limit as number | undefined;
            const offset = req.query?.offset as number | undefined;

            const records = await TodoInstance.findAll({ where: {}, limit, offset });
            return res.json(records);

        } catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: '/read' });
        }

    }

    async readByID(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const records = await TodoInstance.findAll({ where: { id } });
            return res.json(records);

        } catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: '/read' });
        }

    }

    async update(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const record = await TodoInstance.findOne({ where: { id } });
            if (!record) {
                return res.json({ msg: "can't not find existing records" });
            }

            const updateRecord = await record.update({ completed: !record.getDataValue('completed') });
            return res.json({ record: updateRecord });
        } catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: '/update/:id' });
        }

    }

    async delete(req: Request, res: Response) {
        try {

            const { id } = req.params;
            

            const record = await TodoInstance.findOne({ where: { id } });
            if (!record) {
                return res.json({ msg: "can't not find existing records" });
            }

            const deletedRecord = await record.destroy();
            return res.json({ record: deletedRecord });
        } catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: '/update/:id' });
        }

    }

}

export default new TodoController();