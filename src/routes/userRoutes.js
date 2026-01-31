
import {Router} from "express";
import { getHome, getAbout } from "../controllers/userController.js";

const router = Router();
router.get('/', getHome)
router.get('/about', getAbout)

export default router