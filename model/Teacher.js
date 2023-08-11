const mongoose = require("mongoose");
const User = require("./User");

const teacherSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    courses: [
      {
        courseTitle: { type: String, required: true },
        department: { type: String, required: true },
      },
    ],
    availability: [
      {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
        isBooked: { type: Boolean, default: false },
        bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
