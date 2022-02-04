const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

const {
    getCattery,
    } = require("../mdb")

router.get("/", async (req, res) => {
    const user = req.user
    const cats = await getCattery(user.UserName)
    res.status(200).json(cats.filter(e=> !e.adopted))
})

module.exports = router;