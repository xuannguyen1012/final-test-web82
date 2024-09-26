import { Router } from "express";
import { loginUser, registerUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.post('/registers', registerUser )
userRouter.post('/logins', loginUser)

export default userRouter;