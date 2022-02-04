const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

const {
    getStock,
    } = require("../mdb")

router.get("/", async (req, res) => {
    const user = req.user
    const stock = await getStock(user.UserName)
    res.status(200).json(stock)
})

module.exports = router;