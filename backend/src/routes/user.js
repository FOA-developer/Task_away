import { Router } from "express";
import { loginUser, registerUser, getMe} from "../controllers/user.js";
import verifyToken from "../middleware/auth.js"

const authRouter = Router();
authRouter.post("/login", loginUser)
authRouter.post("/register", registerUser)
authRouter.get("/get_user", verifyToken, getMe)

export default authRouter;