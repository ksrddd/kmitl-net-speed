import express from "express"
import speed from "./speed.js"
import usage from "./usage.js"
import networks from "./networks.js"
import report from "./report.js"

const router = express.Router()

router.use(speed)
router.use(usage)
router.use(networks)
router.use(report)

export default router
