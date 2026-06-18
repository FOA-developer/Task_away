import {Router} from 'express';
import { createWorkspace } from '../controllers/workspace.js';
import verifyToken from "../middleware/auth.js"

const Workspacerouter = Router();

Workspacerouter.post("/create_workspace", verifyToken , createWorkspace);

export default Workspacerouter;
