import { Router } from "express"
import todo from "./todo.controller/router"

const router: Router = Router()

export default router.use("/todo", todo)
