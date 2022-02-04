const { findUserById, findSessionById } = require("../mdb");

async function verifyUser(req, res, next) {
  const token = req.header("Authorization");
  const session = await findSessionById(token);
  if(!session) return res.sendStatus(401)
  const user = await findUserById(session.userId);
  req.user = user;
  if(!user) return res.sendStatus(401)
  next();
}

module.exports = { verifyUser };
