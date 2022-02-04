const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const bcrypt = require('bcrypt');

const {
  readUsers,
  findDocumentByUser,
  createSessions,
} = require("../mdb");

router.post("/", async (req, res) => {
  // o que iremos receber do frontend
  const { userName, password } = req.body;
  const user = await findDocumentByUser(userName);
  const users = await readUsers();

  if (userName.length == 0) {
    res.status(400).json({ Message: "Insert your UserName." });
    return;
  }

  if (password == "") {
    res.status(400).json({ Message: "Please insert password." });
    return;
  }

  if (!users.find((e) => e.UserName == userName)) {
    res.status(400).json({ Message: "This account does not exist!" });
    return;
  }

  if (!bcrypt.compareSync(password, user.Password)) {
    res.status(400).json({ Message: "This account does not exist!!" });
    return;
  }
 
  else {
    const user = await findDocumentByUser(userName);
    const token = await createSessions({
      userName,
      userId: user._id.toString(),
    });
    res.status(200).json({
      token,
      Message: "Successful Login!",
    });
  }
});

module.exports = router;