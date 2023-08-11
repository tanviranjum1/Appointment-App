const express = require("express");
const router = express.Router();
const studentsControllers = require("../controllers/students-controllers.js");
const protect = require("../middlewares/authMiddleware");

router.route("/searchTeacher").post(studentsControllers.searchTeacher);

router
  .route("/getCoursesAndDepartments")
  .get(studentsControllers.getCoursesAndDepartments);

router
  .route("/updateTeacherAvailability/:av_id")
  .patch(studentsControllers.updateTeacherAvailability);

router.route("/profile").post(studentsControllers.addStudentProfile);

module.exports = router;
