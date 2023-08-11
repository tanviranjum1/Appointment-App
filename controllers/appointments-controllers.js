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

const editAppointmentById = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;

  const {
    customer,
    appointmentItems,
    itemsCount,
    entryBy,
    memoDate,
    totalPrice,
    paymentMethod,
    isPaid,
    isDelivered,
  } = req.body;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
  } catch (err) {
    res.status(404).json({ error: "appointment not found to edit" });
  }

  try {
    if (appointment) {
      appointment.customer = customer;
      appointment.appointmentItems = appointmentItems;
      appointment.itemsCount = itemsCount;
      appointment.entryBy = entryBy;
      appointment.memoDate = memoDate;
      appointment.totalPrice = totalPrice;
      appointment.paymentMethod = paymentMethod;
      appointment.isPaid = isPaid;
      appointment.isDelivered = isDelivered;

      const editedappointment = await appointment.save();
      res.status(200).json(editedappointment);
    }
  } catch (err) {
    console.log("Server error", err);
  }
});

const createAppointment = asyncHandler(async (req, res) => {
  const {
    customer,
    appointmentItems,
    itemsCount,
    entryBy,
    memoDate,
    totalPrice,
    paymentMethod,
    isPaid,
    isDelivered,
  } = req.body;

  const createdappointment = new Appointment({
    customer,
    appointmentItems,
    itemsCount,
    entryBy,
    memoDate,
    totalPrice,
    paymentMethod,
    isPaid,
    isDelivered,
  });

  try {
    const appointment = await createdappointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error" + appointment);
  }
});

exports.getAppointments = getAppointments;
exports.getAppointmentById = getAppointmentById;
exports.createAppointment = createAppointment;
exports.editAppointmentById = editAppointmentById;
exports.deleteAppointmentById = deleteAppointmentById;
