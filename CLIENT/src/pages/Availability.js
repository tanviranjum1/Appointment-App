import React from "react";
import { DateTime } from "luxon";
import { deleteAvailability } from "../actions/teacherActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../share/Loader";

const Availability = ({ availability }) => {
  const dispatch = useDispatch();

  const profileDeleteAvailability = useSelector(
    (state) => state.profileDeleteCourse
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = profileDeleteAvailability;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // DELETE PRODUCTS
      dispatch(deleteAvailability(id));
    }
  };

  const availabilityItems = availability.map((av) => (
    <tr key={av._id}>
      <td>{DateTime.fromISO(av.from).toFormat("cccc")}</td>
      <td> {DateTime.fromISO(av.from).toFormat("yyyy-MM-dd")}</td>
      <td>
        {DateTime.fromISO(av.from).toFormat("hh:mm a")} -{" "}
        {DateTime.fromISO(av.to).toFormat("hh:mm a")}
      </td>
      <td>
        <Button onClick={() => deleteHandler(av._id)} variant="outlined">
          {" "}
          Delete
        </Button>
      </td>
      <td></td>
    </tr>
  ));

  return (
    <>
      {loadingDelete && <Loader />}
      {errorDelete && <h1 variant="danger">{errorDelete}</h1>}

      <h2>Availability</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Available Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{availabilityItems}</tbody>
      </table>
    </>
  );
};

export default Availability;
