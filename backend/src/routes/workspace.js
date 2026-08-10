import {Router} from 'express';
import { createWorkspace, switchWorkspace, getWorkspace } from '../controllers/workspace.js';
import verifyToken from "../middleware/auth.js"

const Workspacerouter = Router();

Workspacerouter.post("/create_workspace", verifyToken , createWorkspace);
Workspacerouter.get("/get_workspace", verifyToken, getWorkspace);
Workspacerouter.patch("/switch_workspace", verifyToken, switchWorkspace);


export default Workspacerouter;
