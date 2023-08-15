import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listCoursesAndDepartments,
  searchTeachers,
} from "../actions/studentActions";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DateTime } from "luxon";

const StudentSearch = () => {
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownCoursesAndDepartments = useSelector(
    (state) => state.dropdownCoursesAndDepartments
  );
  const { loading, error, lists } = dropdownCoursesAndDepartments;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const searchTeacher = useSelector((state) => state.searchTeacher);
  const {
    loading: loadingTeachers,
    error: errorTeachers,
    teachers,
  } = searchTeacher;

  // want list users to reload when delete success.
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listCoursesAndDepartments());
    }
  }, [dispatch, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      department,
      courseTitle: course,
    };
    dispatch(searchTeachers(obj));
  };

  return (
    <div>
      <h2 style={{ margin: 0 }}>Available Teachers</h2>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "grid",
          gridTemplateColumns: "240px 240px 30px",
          gridTemplateRows: "1fr",
          gap: "20px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={department}
            label="Department"
            onChange={(event) => setDepartment(event.target.value)}
          >
            <MenuItem key="did" value=""></MenuItem>
            {lists.departments &&
              lists.departments.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Courses</InputLabel>
          <Select
            labelId="demo-simple-course-select-label"
            id="demo-simple-course-select"
            value={course}
            label="Course"
            onChange={(event) => setCourse(event.target.value)}
          >
            <MenuItem value="" key="cid"></MenuItem>
            {lists.courses &&
              lists.courses.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div>
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Search
          </Button>
        </div>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Teacher Name</TableCell>
              <TableCell>Courses Taught</TableCell>
              <TableCell align="right">
                <p>Available Slots</p>
                <small>* Click to book now</small>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers &&
              teachers.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.userId.name}{" "}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.courses &&
                      row.courses.map((item) => {
                        return item.courseTitle === course ? (
                          <span
                            key={item._id}
                            style={{ textDecoration: "underline" }}
                          >
                            {item.courseTitle},{" "}
                          </span>
                        ) : (
                          <span key={item._id}>{item.courseTitle},</span>
                        );
                      })}
                  </TableCell>

                  <TableCell align="right">
                    {row.availability &&
                      row.availability.map((slot) => {
                        return slot.isBooked === false ? (
                          <Link
                            to={`/appointment/submit/${slot._id}`}
                            key={slot._id}
                            state={{
                              teacherName: row.userId.name,
                              from: slot.from,
                              to: slot.to,
                              teacherUserId: row.userId,
                              teacherId: row._id,
                              teacherCourse:
                                course == "" || course == null
                                  ? row.courses.map(
                                      (course) => course.courseTitle
                                    )
                                  : [course],
                            }}
                          >
                            <Button>
                              {DateTime.fromISO(slot.from).toFormat(
                                "yyyy-MM-dd"
                              )}
                              {DateTime.fromISO(slot.from).toFormat("hh:mm a")}{" "}
                              - {DateTime.fromISO(slot.to).toFormat("hh:mm a")}
                            </Button>
                          </Link>
                        ) : null;
                      })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentSearch;
