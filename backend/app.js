global.config = require(process.env.NODE_ENV === "production"
   ? "./config-prod"
   : "./config-dev");

const express = require("express");
const cors = require("cors");
const authController = require("./controllers/auth-controller");
const vacationsController = require("./controllers/vacations-controller");
const adminController = require("./controllers/admin-controller");
const socketInit = require("../backend/utils/socket-Io");
const fileUpload = require("express-fileupload");
const expressRateLimit = require("express-rate-limit");
const stripTag = require("./middleware/strip-tag");
const cookie = require("cookie-parser");

const server = express();

server.use(cors());

server.use(
   "/api",
   expressRateLimit({
      windowMs: 1000,
      max: 60,
      message: "Server busy. :=/",
   })
);

server.use(stripTag);

server.use(cookie());
server.use(fileUpload());

server.use(express.json());

server.use((err, request, response, next) => {
   response.status(err.status).send(err.message);
});

server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/admin", adminController);

const expressListener = server.listen(3001 || process.env.PORT, () => {
   console.log("Server Running");
});

socketInit.init(expressListener);
