import { Router } from "express";
import verifyToken from "../middleware/auth.js";
import { createTask, getTask } from "../controllers/task.js";

const taskRouter = Router();

taskRouter.post("/create_task", verifyToken, createTask);
taskRouter.get("/get_task", verifyToken, getTask);

export default taskRouter;