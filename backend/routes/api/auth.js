import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../../config/db.js"

const router = express.Router()

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password)
            return res.status(400).json({ msg: "Missing fields" })

        const hash = await bcrypt.hash(password, 10)

        db.query(
            "INSERT INTO users(email,password) VALUES (?,?)",
            [email, hash],
            (err) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY")
                        return res.status(409).json({ msg: "Email already exists" })
                    return res.status(500).json(err)
                }

                res.json({ msg: "registered" })
            }
        )
    }
    catch (err) {
        res.status(500).json(err)
    }
})


// =========================
// LOGIN
// =========================
router.post("/login", (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ msg: "Missing fields" })

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err)
                return res.status(500).json(err)

            if (result.length === 0)
                return res.status(404).json({ msg: "user not found" })

            const user = result[0]

            const valid = await bcrypt.compare(password, user.password)

            if (!valid)
                return res.status(401).json({ msg: "wrong password" })

            const token = jwt.sign(
                { id: user.id },
                "secretkey",
                { expiresIn: "1d" }
            )

            res.json({ token })
        }
    )
})

export default router
