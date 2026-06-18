import express from "express";
import cors from "cors"
import authRouter from "./src/routes/user.js"
import Workspacerouter from "./src/routes/workspace.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter )
app.use("/api/workspace", Workspacerouter)




export default app;