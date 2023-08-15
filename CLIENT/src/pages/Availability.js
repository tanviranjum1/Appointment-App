import React from "react";
import { DateTime } from "luxon";
import { deleteAvailability } from "../actions/teacherActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../share/Loader";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

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
      dispatch(deleteAvailability(id));
    }
  };

  const availabilityItems = availability.map((av) => (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      key={av._id}
    >
      <TableCell>{DateTime.fromISO(av.from).toFormat("yyyy-MM-dd")}</TableCell>
      <TableCell component="th" scope="row">
        {DateTime.fromISO(av.from).toFormat("cccc")}
      </TableCell>
      <TableCell>
        {DateTime.fromISO(av.from).toFormat("hh:mm a")} -{" "}
        {DateTime.fromISO(av.to).toFormat("hh:mm a")}
      </TableCell>
      <TableCell align="center">
        <Button onClick={() => deleteHandler(av._id)}>
          {" "}
          <DeleteOutlinedIcon />
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      {loadingDelete && <Loader />}
      {errorDelete && <h1 variant="danger">{errorDelete}</h1>}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Free Slot</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{availabilityItems}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Availability;
