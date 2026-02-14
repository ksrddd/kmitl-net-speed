import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import api from "./routes/api/api.js"
import authRoutes from "./routes/api/auth.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", api)
app.use("/api/auth", authRoutes)

app.listen(4000,()=>console.log("Server running 4000"))
