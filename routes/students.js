const express = require("express");
const router = express.Router();
const studentsControllers = require("../controllers/students-controllers.js");
const protect = require("../middlewares/authMiddleware");

router.route("/searchTeacher").post(studentsControllers.searchTeacher);

router
  .route("/getCoursesAndDepartments")
  .get(studentsControllers.getCoursesAndDepartments);

// router.get("/", studentsControllers.getStudents);

// router.get("/:id", studentsControllers.getStudentById);

// router.post("/", studentsControllers.createStudent);

// router.put("/:id", studentsControllers.editStudentById);

// router.delete("/:id", studentsControllers.deleteStudentById);

module.exports = router;
