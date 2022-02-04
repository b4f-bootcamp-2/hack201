const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);
const {
  checkEmail,
  checkPasswordStrength
} = require("../helperFunctions/functions");

const {
  createAcc,
  readUsers,
  createStock
} = require("../mdb");

// Endpoint Do registo do utilizador
router.post("/", async (req, res) => {
  const { email, userName, password, passwordConfirmation } = req.body;
  const erros = {};
  const users = await readUsers();

  // Verifica os parametros com os dados que temos ver se cumprem as regras
  if (checkEmail(email)) {
    erros.Message = checkEmail(email);
    res.status(400).json(erros);
    return;
  }

  if (users.some((e) => e.email === email)) {
    erros.Message =
      "Please check your email .It is possible that you have already signup.";
    res.status(400).json(erros);
    return;
  }
  
  if (checkPasswordStrength(password) < 4) {
    erros.Message =
      "Your Password must contain at least an uppercase letter, a Number and a special character.";
    res.status(400).json(erros);
    return;
  }

  if (userName.length == 0) {
    erros.Message = "Please insert a Username.";
    res.status(400).json(erros);
    return;
  }

  if (users.some((e) => e.UserName == userName)) {
    erros.Message = "Your Username as already been taken!";
    res.status(400).json(erros);
    return;
  }

  if (password !== passwordConfirmation) {
    erros.Message = "Could not log in!";
    res.status(400).json(erros);
    return;
  } else {
    //Se não houver erros guardamos os dados necessários
    await createAcc({
      Email: email,
      UserName: userName,
      Password: bcrypt.hashSync(password, saltRounds, null)
    });

    await createStock({
      UserName: userName,
      CurrentWater: 0,
      CurrentMedicine: 0,
      CurrentFood: 0,
      NeededWater: 0,
      NeededMedicines: 0,
      NeededFood: 0,
      Savings: 0 // mealheiro
    })
    
    res
      .status(200)
      .json({ Message: "Your Account has been created! Please Log in!" });
  }
});

module.exports = router;