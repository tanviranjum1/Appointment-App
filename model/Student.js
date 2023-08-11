const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    department: {
      type: String,
      required: [true, "Please add a department"],
    },
    studentId: {
      type: String,
      required: [true, "Please add student Id"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
