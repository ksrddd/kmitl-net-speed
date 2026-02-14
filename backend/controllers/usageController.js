import { db } from "../config/db.js"

export const getUsage = async (req,res)=>{
  const [rows] = await db.query("SELECT * FROM usage_stats")
  res.json(rows)
}
