import { Exeption } from "../../exeption/exeption"
import { ToDoEntity } from "../../entities/todo.entity"
import { NextFunction } from "express"
import { Response } from "express"
import { Request } from "express"
import { AppDataSource as dataSource } from "../../config/ormconfig"
import redis from "../../config/redis"

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoAll = await dataSource
        .getRepository(ToDoEntity)
        .find()
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      res.status(200).json({
        status: 200,
        data: todoAll,
      })
    } catch (error: any) {
      next(new Exeption(error.message, 500))
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { text } = req.body

      await dataSource
        .getRepository(ToDoEntity)
        .createQueryBuilder()
        .insert()
        .into(ToDoEntity)
        .values({ text })
        .execute()
        .catch((err: Exeption) => next(new Exeption(err.message, 500)))

      res.status(200).json({
        status: 200,
        message: "Text has been created",
      })
    } catch (error: any) {
      return next(new Exeption(error.message, 500))
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const { text } = req.body

    await dataSource
      .createQueryBuilder()
      .update(ToDoEntity)
      .set({ text })
      .where({ id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(201).json({
      message: "Text has been update",
      status: 201,
    })
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(ToDoEntity)
      .where({ id })
      .execute()
      .catch((err: Exeption) => next(new Exeption(err.message, 500)))

    res.status(201).json({
      message: "Text has been deleted",
      status: 201,
    })
  },
}
