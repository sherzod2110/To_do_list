import express, { Application, Response, Request } from "express"
import { AppDataSource } from "./config/ormconfig"
import routes from "./controller/index"
import errorHandler from "./middlewares/errorHandler"
import cors from "cors"
import path from "path"
import ejs from "ejs"
import env from "dotenv"
import bodyParser from "body-parser"
env.config()

const main = async (): Promise<void> => {
  const app: Application = express()

  try {
    await AppDataSource.initialize()
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(cors({origin:'*'}))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.set("view engine", "ejs")
    app.set("views", path.join(process.cwd(), "src", "views"))
    app.use(routes)
    app.use(errorHandler)
    
    app.all("/*", (req: Request, res: Response) => res.render("errors.ejs"))
  } catch (err: unknown) {
    console.log("Server Error")
  } finally {
    app.listen(9090, (): void => {
      console.log(9090)
    })
  }
}

main()
