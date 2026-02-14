export const getSpeed = (req, res) => {
    const speed = Math.floor(Math.random() * 100) + 50
    res.json({ speed })
}
