const express = require("express");
const vacationsLogic = require("../business-logic/vacations-logic");
const errors = require("../utils/errors-settings");
const verifyLoggedIn = require("../middleware/verify-loggedIn");
const sockets = require("../utils/socket-Io");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/images/:name", (request, response) => {
   try {
      const name = request.params.name;
      let absolutePath = path.join(
         __dirname,
         "..",
         "images",
         "vacationsImage",
         name
      );
      if (!fs.existsSync(absolutePath)) {
         absolutePath = path.join(__dirname, "..", "images", "notFound.png");
      }
      response.sendFile(absolutePath);
   } catch (err) {
      response.status(500).send(errors.error(err));
   }
});

router.use(verifyLoggedIn);

router.post("/", async (req, res) => {
   try {
      const vacationsList = await vacationsLogic.getAllVacationsAsync(req.body);
      res.json(vacationsList);
   } catch (err) {
      res.status(500).send(errors.error(err));
   }
});

router.post("/fallow", async (req, res) => {
   try {
      const addedTag = await vacationsLogic.fallowAsync(
         req.body.uuid,
         req.body.vacationId
      );

      sockets.fallow(addedTag);
      res.status(201).json(addedTag);
   } catch (err) {
      res.status(500).send(errors.error(err.message));
   }
});

router.post("/unFallow", async (req, res) => {
   try {
      const unFallowTag = await vacationsLogic.unFallowAsync(
         req.body.uuid,
         req.body.vacationId
      );
      sockets.unFallow(unFallowTag);
      res.status(201).json(unFallowTag);
   } catch (err) {
      res.status(500).send(errors.error(err.message));
   }
});

module.exports = router;
