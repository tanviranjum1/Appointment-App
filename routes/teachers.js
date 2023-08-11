const express = require("express");
const teachersControllers = require("../controllers/teachers-controllers");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/profile/me").get(protect, teachersControllers.getMyProfile);

router
  .route("/profile/availability")
  .put(protect, teachersControllers.addAvailability);

router.route("/profile/course").put(protect, teachersControllers.addCourse);

router
  .route("/profile/course/:c_id")
  .delete(protect, teachersControllers.deleteCourse);

router
  .route("/profile/availability/:av_id")
  .delete(protect, teachersControllers.deleteAvailability);

router
  .route("/appointments")
  .post(protect, teachersControllers.getAppointmentRequestsForLoggedInTeacher);

module.exports = router;
