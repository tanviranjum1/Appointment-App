import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../share/Loader";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  adminRegisterUser,
  deleteUser,
  listUsers,
  registerUser,
} from "../actions/userActions";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// import { updateAppointment } from "../actions/appointmentActions";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  //get success value from product delete state.
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listUsers({ role: "" }));
    }
  }, [dispatch, userInfo, successDelete, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(listUsers({ role: userType }));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // DELETE USER
      dispatch(deleteUser(id));
    }
  };

  const registerHandler = (id) => {
    if (window.confirm("Are you sure to register the user")) {
      dispatch(adminRegisterUser({ _id: id }));
    }
  };

  console.log("users", users);

  return (
    <>
      <h1>User List</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
          >
            <MenuItem key="All" value="">
              All
            </MenuItem>
            <MenuItem key="Students" value="student">
              Students
            </MenuItem>
            <MenuItem key="Teachers" value="teacher">
              Teachers
            </MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          Search
        </Button>
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
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">NAME</StyledTableCell>
                <StyledTableCell align="right">EMAIL</StyledTableCell>
                <StyledTableCell align="right">ROLE</StyledTableCell>
                <StyledTableCell align="right">ISREGISTERED</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <StyledTableRow key={user._id}>
                    <StyledTableCell component="th" scope="row">
                      {user._id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{user.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      {user.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">{user.role}</StyledTableCell>
                    <StyledTableCell align="right">
                      {user.isRegistered === false ? (
                        <Button
                          variant="outlined"
                          onClick={() => registerHandler(user._id)}
                        >
                          Register
                        </Button>
                      ) : (
                        <p>
                          {user.isRegistered ? "Registered" : "Not Registered"}
                        </p>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link to={`/user/${user._id}/edit`}>
                        <Button variant="contained"> EDIT</Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        DELETE
                      </Button>
                    </StyledTableCell>
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

export default UserList;
