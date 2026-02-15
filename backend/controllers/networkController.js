import db from "../db.js"

export const getNetworks = (req, res) => {
  db.query(
    "SELECT id,name,speed FROM networks ORDER BY speed DESC",
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json(result)
    }
  )
}
