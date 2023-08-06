const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getTeacherUsers,
  getStudentUsers,
  getRegistrationRequestUsers,
  getUserById,
  editUserById,
  deleteUserById,
} = require("../controllers/users-controllers.js");
// const { protect } = require('../middleware/authMiddleware')

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.get("/unregistered", getRegistrationRequestUsers);
router.get("/teacher", getTeacherUsers);
router.get("/student", getStudentUsers);

router.delete("/:id", deleteUserById);
router.put("/:id", editUserById);
router.get("/:id", getUserById);

module.exports = router;
