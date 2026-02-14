import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import networkRoutes from "./routes/networkRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"
import usageRoutes from "./routes/usageRoutes.js"
import speedRoutes from "./routes/speedRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/networks", networkRoutes)
app.use("/api/report", reportRoutes)
app.use("/api/usage", usageRoutes)
app.use("/api/speed", speedRoutes)

app.listen(4000,()=>console.log("Server running 4000"))