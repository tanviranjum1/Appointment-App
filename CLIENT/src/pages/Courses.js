import React, { Fragment } from "react";
import { deleteCourse } from "../actions/teacherActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../share/Loader";
import Button from "@mui/material/Button";

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
      // DELETE PRODUCTS
      dispatch(deleteCourse(id));
    }
  };

  const courseList = courses.map((cr) => (
    <tr key={cr._id}>
      <td>{cr.department}</td>
      <td>{cr.courseTitle}</td>
      <td>
        <Button onClick={() => deleteHandler(cr._id)} variant="contained">
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      {loadingDelete && <Loader />}
      {errorDelete && <h1 color="danger">{errorDelete}</h1>}

      <h2 className="my-2">Courses</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Course</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{courseList}</tbody>
      </table>
    </Fragment>
  );
};

export default Courses;
