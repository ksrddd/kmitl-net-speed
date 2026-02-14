import express from "express"
const router = express.Router()

router.get("/speed", (req, res) => {
    res.json({
        download: Math.floor(Math.random()*100),
        upload: Math.floor(Math.random()*100),
        ping: Math.floor(Math.random()*20)
    })
})

export default router
