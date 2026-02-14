import express from "express"
import {getSpeed} from "../controllers/speedController.js"
const router = express.Router()

router.get("/",getSpeed)

export default router
