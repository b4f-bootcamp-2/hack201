const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.post("/", async (req, res) => {
	res.sendStatus(200)// PARA JA
})


module.exports = router;