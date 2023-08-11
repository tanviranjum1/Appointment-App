const Teacher = require("../model/Teacher");
const asyncHandler = require("express-async-handler");

// @route    GET api/students/searchTeacher
// @desc     find by course or department or course and department
// @access   Public
const searchTeacher = asyncHandler(async (req, res) => {
  try {
    const { courseTitle, department } = req.body;

    let query = {};

    if (courseTitle && department) {
      query.$and = [
        { "courses.courseTitle": { $regex: courseTitle, $options: "i" } },
        { "courses.department": { $regex: department, $options: "i" } },
      ];
    } else if (courseTitle) {
      query["courses.courseTitle"] = { $regex: courseTitle, $options: "i" };
    } else if (department) {
      query["courses.department"] = { $regex: department, $options: "i" };
    }
    const foundTeacher = await Teacher.find(query).populate("userId", "name");

    if (!foundTeacher || foundTeacher.length === 0) {
      return res.status(400).json({ msg: "No such teacher" });
    }

    return res.status(200).json(foundTeacher);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" + req.body });
  }
});

// @route    GET api/students/getCoursesAndDepartments
// @desc     get courses and department unique list.
// @access   Public
const getCoursesAndDepartments = asyncHandler(async (req, res) => {
  try {
    const courses = await Teacher.aggregate([
      { $unwind: "$courses" }, // Unwind the courses array
      {
        $group: {
          _id: null,
          uniqueCourses: { $addToSet: "$courses.courseTitle" },
          uniqueDepartments: { $addToSet: "$courses.department" },
        },
      },
    ]);

    if (!courses || courses.length === 0) {
      return res
        .status(400)
        .json({ msg: "No courses or departments currently available" });
    }

    const uniqueCourses = courses[0].uniqueCourses;
    const uniqueDepartments = courses[0].uniqueDepartments;
    const list = { courses: uniqueCourses, departments: uniqueDepartments };

    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = {
  searchTeacher,
  getCoursesAndDepartments,
};
