const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    departmentId: {
      type: String,
      required: [true, "Please add a password"],
    },
    studentId: {
      type: String,
      required: [true, "Please add role"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
