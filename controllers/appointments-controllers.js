const Appointment = require("../model/Appointment.js");

const asyncHandler = require("express-async-handler");

const getAppointments = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

const getAppointmentById = asyncHandler(async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.json(appointment);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

const deleteAppointmentById = asyncHandler(async (req, res) => {
  Appointment.findByIdAndRemove(req.params.id)
    .then((appointment) =>
      res.json({ mgs: "Appointment remove successful!" + appointment })
    )
    .catch((err) => res.status(404).json({ error: "appointment not found" }));
});

const updateAppointmentById = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;

  const { status } = req.body;

  let appointment;
  try {
    appointment = await Appointment.findById({ _id: appointmentId });
  } catch (err) {
    res.status(404).json({ error: "appointment not found to edit" });
  }

  try {
    if (appointment) {
      appointment.status = status;

      const editedappointment = await appointment.save();
      res.status(200).json(editedappointment);
    }
  } catch (err) {
    console.log("Server error", err);
  }
});

const createAppointment = asyncHandler(async (req, res) => {
  const {
    status,
    studentUserId,
    teacherUserId,
    end,
    start,
    courseTitle,
    agenda,
  } = req.body;

  const createdappointment = new Appointment({
    status,
    studentUserId,
    teacherUserId,
    end,
    start,
    courseTitle,
    agenda,
  });

  try {
    const appointment = await createdappointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error" + appointment);
  }
});

const getAppointmentsSubmittedbyStudent = asyncHandler(async (req, res) => {
  try {
    const appointment = await Appointment.findById({
      studentUserId: req.user.id,
    });
    res.json(appointment);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

exports.getAppointments = getAppointments;
exports.getAppointmentById = getAppointmentById;
exports.createAppointment = createAppointment;
exports.updateAppointmentById = updateAppointmentById;
exports.deleteAppointmentById = deleteAppointmentById;
exports.getAppointmentsSubmittedbyStudent = getAppointmentsSubmittedbyStudent;
