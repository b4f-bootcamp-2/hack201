const express = require("express");
const app = express();
const port = process.env.PORT ?? 3777;
app.use(express.json());

////ROUTERS
const routerLogin = require("./routes/login");
const routerSignup = require("./routes/signup");
const routerDashboard = require("./routes/dashboard");
const routerCatRegistration = require("./routes/catregistration")
const routerCattery = require("./routes/cattery")
const routerStock = require("./routes/stock")
const routerToken = require("./routes/token")
const routerAddStock = require("./routes/addstock")
const routerRemoveStock = require("./routes/removestock")

////MIDDLEWARE
const { verifyUser } = require("./helperFunctions/midleware");

////APIS's
app.use("", routerLogin);
app.use("/signup", routerSignup);
app.use("/dashboard", verifyUser, routerDashboard);
app.use("/catregistration", verifyUser, routerCatRegistration);
app.use("/cattery", verifyUser, routerCattery);
app.use("/stock", verifyUser, routerStock);
app.use("/token", verifyUser, routerToken);
app.use("/addstock", verifyUser, routerAddStock);
app.use("/removestock", verifyUser, routerRemoveStock);

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`));