const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const {
    updateGoods,
    getStock
} = require("../mdb")

router.post("/", async (req, res) => {
    const { type, value } = req.body;
    const user = req.user;
    const prev = await getStock(user.UserName)
    if(type === undefined || type === "select option") return res.status(400).json({Message: "Please select as option"})
    if(value === undefined || value === 0) return res.status(400).json({Message: "Please insert a value"})
    if(type === "Water") await updateGoods(user.UserName, prev.CurrentFood, prev.CurrentWater + Number(value), prev.Savings, prev.CurrentMedicine)
    if(type === "Food") await updateGoods(user.UserName, prev.CurrentFood + Number(value), prev.CurrentWater, prev.Savings, prev.CurrentMedicine)
    if(type === "Medicine") await updateGoods(user.UserName, prev.CurrentFood, prev.CurrentWater, prev.Savings, prev.CurrentMedicine + Number(value))
    if(type === "Donations"||type === "Campaigns" || type === "Raffles" ) await updateGoods(user.UserName, prev.CurrentFood, prev.CurrentWater, prev.Savings + Number(value), prev.CurrentMedicine)
	return res.status(200).json({Message: "Successful update!"})
})


module.exports = router;