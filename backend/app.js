import express from "express";
import cors from "cors"
import authRouter from "./src/routes/user.js"
import Workspacerouter from "./src/routes/workspace.js"
import taskRouter from "./src/routes/task.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter )
app.use("/api/workspace", Workspacerouter)
app.use("/api/task", taskRouter)


export default app;