
import {Router} from "express";
import { getHome, getAbout, postUser, loginUser, singleUser, logOut } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.get('/', getHome)
router.get('/about', authMiddleware, getAbout)
router.post('/create-user', postUser)
router.post('/login', loginUser)
router.get("/user/:id", authMiddleware, singleUser)
router.get("/logout", authMiddleware, logOut)

export default router