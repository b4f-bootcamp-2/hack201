const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const {
createCat,
updateStock,
getStock,
getCattery
} = require("../mdb")

const {
	microchipIdGenerator
} = require("../helperFunctions/functions")


//EM MEDIA UM GATO CONSOME 75G DE COMIDA POR DIA
//EM MEDIA UM GATO DEVE BEBER 330 MILILITROS DE ÁGUA POR DIA
router.post("/", async (req, res) => {
	const { name, weight, approximateAge, color, breed } = req.body;
	const user = req.user;
	const username = user.UserName
	const cats = await getCattery(username)
	if(name === "") return res.status(400).json({Message: "Please fill in the cat's name!"})
	if(cats.some(e => e.name === name)) return res.status(400).json({Message: "There's a cat already registered with this name!"})
	if(weight === 0) return res.status(400).json({Message: "Please fill in the cat's weight!"})
	if(approximateAge == 0) return res.status(400).json({Message: "Please fill in the cat's estimated age!"})
	//if(!terms) return res.status(400).json({Message: "You need to accept the terms of responsibility"})
	else
	{
		let micro = microchipIdGenerator()
		await createCat({
		cattery: username,
		name,
		microchipNumber: micro,
		weight,
		approximateAge,
		color,
		breed,
		adopted: false,
		})

		const user = req.user;
		const previousValue = await getStock(user.UserName)
		//CUSTO INICIAL DE REGISTO COM CHECKUP E CHIP (PREÇO AMIGAVEL) 20
		await updateStock(user.UserName, previousValue.NeededFood + 75, previousValue.NeededWater + 330, previousValue.Savings - 20);

		return res.status(200).json({Message: `The cat ${name}, was successfully registered!` })
	}
})

module.exports = router;