import express from "express"
const router = express.Router()

function randomSpeed(base) {
    return Math.max(5, Math.floor(base + (Math.random() * 20 - 10)))
}

const faculties = [
    { id: 1, name: "คณะวิศวกรรมศาสตร์", base: 85 },
    { id: 2, name: "คณะสถาปัตยกรรม ศิลปะและการออกแบบ", base: 70 },
    { id: 3, name: "คณะวิทยาศาสตร์", base: 75 },
    { id: 4, name: "คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี", base: 65 },
    { id: 5, name: "คณะเทคโนโลยีการเกษตร", base: 60 },
    { id: 6, name: "คณะเทคโนโลยีสารสนเทศ", base: 90 },
    { id: 7, name: "คณะอุตสาหกรรมอาหาร", base: 72 },
    { id: 8, name: "คณะแพทยศาสตร์", base: 68 },
    { id: 9, name: "คณะบริหารธุรกิจ", base: 66 },
    { id: 10, name: "คณะศิลปศาสตร์", base: 62 }
]

// GET /api/networks
router.get("/networks", (req, res) => {
    try {
        const result = faculties.map(f => ({
            id: f.id,
            name: f.name,
            speed: randomSpeed(f.base)
        }))

        res.status(200).json(result)
    } catch (err) {
        console.error("NETWORK API ERROR:", err)
        res.status(500).json({ message: "server error" })
    }
})

export default router
