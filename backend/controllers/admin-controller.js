const express = require("express");
const adminLogic = require("../business-logic/admin-logic");
const serverErrors = require("../utils/errors-settings");
const verifyAdmin = require("../middleware/verify-admin");
const VacationModel = require("../utils/validationVacationModel");
const patchFixerAsync = require("../utils/patchFixer");
const sockets = require("../utils/socket-Io");
const router = express.Router();

router.use(verifyAdmin);

router.get("/likes", async (req, res) => {
   try {
      const likesList = await adminLogic.getAllFallowTagsAsync();
      res.json(likesList);
   } catch (err) {
      res.status(500).send(errors.error(err));
   }
});

router.get("/", async (req, res) => {
   try {
      const vacationsList = await adminLogic.getAllVacationsAsync();
      res.json(vacationsList);
   } catch (err) {
      res.status(500).send(errors.error(err));
   }
});

router.post("/", async (req, res) => {
   try {
      if (req.body.vacationId) delete req.body.vacationId;

      const vacationToAdd = new VacationModel(req.body);
      delete vacationToAdd.vacationId;

      const errors = vacationToAdd.postValidation();

      if (errors) return res.status(400).send(serverErrors.error(errors));

      const image = req.files && req.files.image ? req.files.image : null;

      const addedVacation = await adminLogic.addVacationAsync(
         vacationToAdd,
         image
      );
      sockets.vacationAdded(addedVacation);

      res.status(201).json(addedVacation);
   } catch (err) {
      res.status(500).send(serverErrors.error(err));
   }
});

router.patch("/", async (req, res) => {
   try {
      await patchFixerAsync(req.body);

      const vacationToPatch = new VacationModel(req.body);
      const errors = vacationToPatch.patchValidation();

      if (errors) return res.status(400).send(serverErrors.error(errors));

      const image = req.files && req.files.image ? req.files.image : null;

      const patchedVacation = await adminLogic.patchVacationAsync(
         vacationToPatch,
         image
      );
      if (patchedVacation.affectedRows === 0)
         return res
            .status(404)
            .send(`vacation: ${vacationToPatch.vacationName} is not found.`);

      sockets.vacationUpdated(patchedVacation);
      res.json(patchedVacation);
   } catch (err) {
      res.status(500).send(serverErrors.error(err));
   }
});

router.post("/delete", async (req, res) => {
   try {
    
      const vacationIdDeleted = await adminLogic.deleteVacation(req.body);

      sockets.vacationDeleted(+vacationIdDeleted.vacationId);
      res.status(204).send("Successful Delete.");
   } catch (err) {
      res.status(500).send(serverErrors.error(err));
   }
});

module.exports = router;
