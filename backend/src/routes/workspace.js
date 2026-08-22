import {Router} from 'express';
import { createWorkspace, switchWorkspace, getWorkspace, addMember, getCurrentWorkspace, removeMember} from '../controllers/workspace.js';
import verifyToken from "../middleware/auth.js"
const Workspacerouter = Router();

Workspacerouter.post("/create_workspace", verifyToken , createWorkspace);
Workspacerouter.get("/get_workspace", verifyToken, getWorkspace);
Workspacerouter.patch("/switch_workspace", verifyToken, switchWorkspace);
Workspacerouter.patch("/add_member", verifyToken, addMember);
Workspacerouter.get("/get_currentWorkspace", verifyToken, getCurrentWorkspace);
Workspacerouter.delete("/delete_member/:userId", verifyToken, removeMember);

export default Workspacerouter;
