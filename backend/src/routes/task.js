import { Router } from "express";
import verifyToken from "../middleware/auth.js";
import { createTask, getTask, updateTask, deleteTask} from "../controllers/task.js";
const taskRouter = Router();

taskRouter.post("/create_task", verifyToken, createTask);
taskRouter.get("/get_task", verifyToken, getTask);
taskRouter.patch("/update_task/:taskId", verifyToken, updateTask);
taskRouter.delete("/delete_task/:taskId", verifyToken, deleteTask);

export default taskRouter;