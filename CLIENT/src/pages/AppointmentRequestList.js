import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAppointmentRequestsForTeacher } from "../actions/teacherActions";
import { updateAppointment } from "../actions/appointmentActions";
import { useNavigate } from "react-router-dom";
import Loader from "../share/Loader";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const AppointmentRequestList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const appointmentListForTeacher = useSelector(
    (state) => state.appointmentListForTeacher
  );
  const { loading, error, appointments } = appointmentListForTeacher;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // want list users to reload when delete success.
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listAppointmentRequestsForTeacher({ status: "" }));
    }
  }, [dispatch, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(listAppointmentRequestsForTeacher({ status }));
  };

  const approveHandler = (id) => {
    const userConfirmed = window.confirm("Are you sure to approve the request");

    if (userConfirmed) {
      dispatch(updateAppointment({ _id: id, status: "Approved" }));
    }
  };

  const rejectHandler = (id) => {
    const userConfirmed = window.confirm("Are you sure to reject the request");

    if (userConfirmed) {
      dispatch(updateAppointment({ _id: id, status: "Rejected" }));
    }
  };

  return (
    <>
      <h1>Appointment Requests</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "grid",
          gridTemplateColumns: "240px 30px",
          gridTemplateRows: "1fr",
          gap: "20px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={(event) => setStatus(event.target.value)}
          >
            <MenuItem key="All">All</MenuItem>
            <MenuItem key="Submitted" value="Submitted">
              Pending
            </MenuItem>
            <MenuItem key="Approved" value="Approved">
              Approved
            </MenuItem>
            <MenuItem key="Rejected" value="Rejected">
              Rejected
            </MenuItem>
          </Select>
        </FormControl>

        <div>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </div>
      </Box>

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
                <StyledTableCell>Course</StyledTableCell>
                <StyledTableCell>RequestedBy</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Duration</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments &&
                appointments.map((appointment) => (
                  <StyledTableRow key={appointment._id}>
                    <StyledTableCell component="th" scope="row">
                      {appointment.agenda}
                    </StyledTableCell>
                    <StyledTableCell>{appointment.courseTitle}</StyledTableCell>
                    <StyledTableCell>
                      {appointment.studentUserId.name}
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                      {appointment.status == "Submitted" ? (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => approveHandler(appointment._id)}
                            size="small"
                          >
                            APPROVE
                          </Button>
                          <Button
                            variant="contained"
                            style={{ marginLeft: "20px" }}
                            onClick={() => rejectHandler(appointment._id)}
                            size="small"
                          >
                            {" "}
                            REJECT
                          </Button>
                        </>
                      ) : (
                        <p>{appointment.status}</p>
                      )}
                    </StyledTableCell>{" "}
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

export default AppointmentRequestList;
