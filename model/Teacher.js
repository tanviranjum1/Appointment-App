const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courses: [
      {
        courseTitle: { type: String, required: true },
        department: { type: String, required: true },
      },
    ],
    availability: [
      {
        day: { type: String, required: true },
        slots: [{ type: String, required: true }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
