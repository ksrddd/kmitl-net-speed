import { db } from "../config/db.js"

export const sendReport = async (req,res)=>{
  const {location,message} = req.body

  await db.query(
    "INSERT INTO reports(location,message) VALUES (?,?)",
    [location,message]
  )

  res.json({status:"ok"})
}
