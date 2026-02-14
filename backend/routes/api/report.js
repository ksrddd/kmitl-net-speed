import express from "express"
const router = express.Router()

router.post("/report", (req,res)=>{
    console.log(req.body)
    res.json({status:"ok"})
})

export default router
