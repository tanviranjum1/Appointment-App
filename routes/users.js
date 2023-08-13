const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserById,
  editUserById,
  deleteUserById,
  adminRegisterUser,
} = require("../controllers/users-controllers.js");
const protect = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/me").get(protect, getMe);

router.route("/admin-registeruser").patch(protect, adminRegisterUser);
router.route("/list").post(protect, getUsers);

router.delete("/:id", deleteUserById);
router.put("/:id", editUserById);
router.get("/:id", getUserById);

module.exports = router;
