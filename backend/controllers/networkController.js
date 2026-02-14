import { db } from "../config/db.js"

export const getNetworks = async (req,res)=>{
  const [rows] = await db.query(
    "SELECT * FROM networks WHERE location=?",
    [req.query.location]
  )
  res.json(rows)
}
