const Teacher = require("../model/Teacher");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// @route    GET api/teachers/profile/me
// @desc     Get current users profile
// @access   Private
const getMyProfile = asyncHandler(async (req, res) => {
  try {
    console.log("userid", req.user.id);

    const profile = await Teacher.findOne({
      userId: req.user.id,
    });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/teachers/profile/course
// @desc     Add course to a teacher
// @access   Private
const addCourse = asyncHandler(async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ userId: req.user.id });

    if (!teacher) {
      // If teacher not found, create a new teacher record
      teacher = new Teacher({
        userId: req.user.id,
        courses: [req.body], // Assuming req.body contains course data
      });
    } else {
      // If teacher is found, add the course to existing teacher
      teacher.courses.unshift(req.body);
    }

    await teacher.save();

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/teachers/profile/course/:c_id
// @desc     Delete course from teacher
// @access   Private
const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const foundTeacher = await Teacher.findOne({ userId: req.user.id });

    foundTeacher.courses = foundTeacher.courses.filter(
      (course) => course._id.toString() !== req.params.c_id
    );

    await foundTeacher.save();
    return res.status(200).json(foundTeacher.courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route    PUT api/teachers/profile/availability
// @desc     Add profile availability
// @access   Private
const addAvailability = asyncHandler(async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ userId: req.user.id });

    if (!teacher) {
      // If teacher not found, create a new teacher record
      teacher = new Teacher({
        userId: req.user.id,
        availability: [req.body], // Assuming req.body contains avaialble slots
      });
    } else {
      // If teacher is found, add the course to existing teacher
      teacher.availability.push(req.body);
    }

    await teacher.save();

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/teachers/profile/availability/:av_id
// @desc     Delete an availability from teacher
// @access   Private
const deleteAvailability = asyncHandler(async (req, res) => {
  try {
    const foundTeacher = await Teacher.findOne({ userId: req.user.id });

    foundTeacher.availability = foundTeacher.availability.filter(
      (available) => available._id.toString() !== req.params.av_id
    );

    await foundTeacher.save();
    return res.status(200).json(foundTeacher);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = {
  getMyProfile,
  addCourse,
  deleteCourse,
  addAvailability,
  deleteAvailability,
};
