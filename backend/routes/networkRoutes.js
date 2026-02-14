import express from "express"
import {getNetworks} from "../controllers/networkController.js"
const router = express.Router()

router.get("/",getNetworks)

export default router
