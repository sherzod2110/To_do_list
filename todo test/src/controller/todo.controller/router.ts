import { todoValidate } from "./validation"
import { Router } from "express"
import validate from "../../middlewares/validate"
import todo from "./todo.controller"

const router: Router = Router()

export default router
  .get("/get", todo.GET)
  .post("/create", validate(todoValidate), todo.POST)
  .put("/update/:id", todo.PUT)
  .delete("/delete/:id", todo.DELETE)
