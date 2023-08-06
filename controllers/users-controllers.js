const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isRegistered: true,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data : get current login user. send token get id from token.
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user); // token passed. auth middleware gives back user id if token successful.
});

// Generate JWT.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getRegistrationRequestUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ isRegistered: false });
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

const getTeacherUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: "teacher", isRegistered: true });
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

const getStudentUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: "student", isRegistered: true });
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

const editUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const { name, email, isRegistered, role } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    res.status(404).json({ error: "user not found to edit" });
  }

  try {
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      user.isRegistered = isRegistered;

      const editeduser = await user.save();
      res.status(200).json(editeduser);
    }
  } catch (err) {
    console.log("Server error", err);
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => res.json({ mgs: "user removed aaaaa" + user }))
    .catch((err) => res.status(404).json({ error: "user not found" + err }));
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getRegistrationRequestUsers,
  getStudentUsers,
  getTeacherUsers,
  getUserById,
  editUserById,
  deleteUserById,
};
