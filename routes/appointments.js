const express = require("express");
const router = express.Router();
const appointmentsControllers = require("../controllers/appointments-controllers.js");

router.get("/", appointmentsControllers.getAppointments);

router.get("/:id", appointmentsControllers.getAppointmentById);

router.post("/", appointmentsControllers.createAppointment);

router.patch("/:id", appointmentsControllers.updateAppointmentById);

router.delete("/:id", appointmentsControllers.deleteAppointmentById);

module.exports = router;
