import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAppointmentRequestsOfStudent } from "../actions/studentActions";
import { useNavigate } from "react-router-dom";
import Loader from "../share/Loader";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const StudentAppointmentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentAppointmentList = useSelector(
    (state) => state.studentAppointmentList
  );
  const { loading, error, appointments } = studentAppointmentList;
  console.log("AppointmentsMy", appointments);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // want list users to reload when delete success.
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listAppointmentRequestsOfStudent());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <h1>Appointments Requested By You</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Agenda</StyledTableCell>
                <StyledTableCell align="right">Course</StyledTableCell>
                <StyledTableCell align="right">RequestedTo</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Duration</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments &&
                appointments.map((appointment) => (
                  <StyledTableRow key={appointment._id}>
                    <StyledTableCell component="th" scope="row">
                      {appointment.agenda}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {appointment.courseTitle}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {appointment.teacherUserId.name}
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <td>{appointment.status}</td>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default StudentAppointmentList;
