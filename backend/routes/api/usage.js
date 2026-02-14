import express from "express"
const router = express.Router()

router.get("/usage", (req, res) => {
    res.json([
        { time:"08:00", users:120 },
        { time:"12:00", users:350 },
        { time:"18:00", users:220 }
    ])
})

export default router
