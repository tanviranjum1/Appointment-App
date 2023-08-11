const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    agenda: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    studentUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    studentId: {
      type: String,
    },
    teacherUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["Submitted", "Approved", "Rejected"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
