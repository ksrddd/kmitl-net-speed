router.post("/report", async (req, res) => {
    const { message } = req.body
    const user = req.user?.email || "guest"

    await db.query(
        "INSERT INTO reports (user_email, message) VALUES (?,?)",
        [user, message]
    )

    res.json({ success: true })
})
