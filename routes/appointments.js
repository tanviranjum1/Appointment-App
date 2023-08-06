const express = require("express");
const router = express.Router();
const appointmentsControllers = require("../controllers/appointments-controllers.js");

router.get("/", appointmentsControllers.getAppointments);

router.get("/:id", appointmentsControllers.getAppointmentById);

router.post("/", appointmentsControllers.createAppointment);

router.put("/:id", appointmentsControllers.editAppointmentById);

router.delete("/:id", appointmentsControllers.deleteAppointmentById);

module.exports = router;
