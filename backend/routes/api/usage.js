import express from "express"
const router = express.Router()

// realtime mock database
let usage = []

function generatePoint() {
    const now = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })

    return {
        time: now,
        users: Math.floor(Math.random() * 500)
    }
}

// preload initial data
for (let i = 0; i < 6; i++) {
    usage.push(generatePoint())
}

// generate realtime data every 2 sec
setInterval(() => {
    usage.push(generatePoint())

    // keep only latest 12 points
    if (usage.length > 12) usage.shift()

}, 2000)


// API endpoint
router.get("/usage", (req, res) => {
    res.json(usage)
})

export default router
