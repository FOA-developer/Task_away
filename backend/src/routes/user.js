import { Router } from "express";
import { loginUser, registerUser} from "../controllers/user.js"

const authRouter = Router();
authRouter.post("/login", loginUser)
authRouter.post("/register", registerUser)

export default authRouter;