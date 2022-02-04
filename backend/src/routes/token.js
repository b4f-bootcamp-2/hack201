const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
    const user = req.user
    if(!user) return res.status(400).json({aside: false} )
    res.status(200).json({aside: true})
})

module.exports = router;