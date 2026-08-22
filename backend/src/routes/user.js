import { Router } from "express";
import { loginUser, registerUser, getMe} from "../controllers/user.js"

const authRouter = Router();
authRouter.post("/login", loginUser)
authRouter.post("/register", registerUser)
authRouter.get("/get_user", getMe)

export default authRouter;