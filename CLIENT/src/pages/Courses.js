import React, { Fragment } from "react";
import { deleteCourse } from "../actions/teacherActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../share/Loader";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const Courses = ({ courses }) => {
  const dispatch = useDispatch();

  const profileDeleteCourse = useSelector((state) => state.profileDeleteCourse);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = profileDeleteCourse;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCourse(id));
    }
  };

  const courseList = courses.map((cr) => (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      key={cr._id}
    >
      <TableCell component="th" scope="row">
        {cr.courseTitle}
      </TableCell>
      <TableCell>{cr.department}</TableCell>
      <TableCell align="center">
        <Button onClick={() => deleteHandler(cr._id)}>
          {" "}
          <DeleteOutlinedIcon />
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <Fragment>
      {loadingDelete && <Loader />}
      {errorDelete && <h1 color="danger">{errorDelete}</h1>}

      <TableContainer component={Paper}>
        <Table sx={{ width: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{courseList}</TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default Courses;
