import express from "express"
const router = express.Router()

router.get("/networks", (req,res)=>{
    res.json([
        { id:1, name:"WiFi-A", speed:80 },
        { id:2, name:"WiFi-B", speed:65 },
        { id:3, name:"WiFi-C", speed:92 }
    ])
})

export default router
