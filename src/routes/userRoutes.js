
import {Router} from "express";
import { getHome, getAbout, postUser, loginUser } from "../controllers/userController.js";

const router = Router();
router.get('/', getHome)
router.get('/about', getAbout)
router.post('/create-user', postUser)
router.post('/login', loginUser)

export default router