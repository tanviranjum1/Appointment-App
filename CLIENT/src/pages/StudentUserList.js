import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudentUsers, deleteUser } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../share/Loader";
import Message from "../share/Message";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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

const StudentUserList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //get success value from product delete state.
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // DELETE PRODUCTS
      dispatch(deleteUser(id));
    }
  };

  // want list users to reload when delete success.
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listStudentUsers());
    }
  }, [dispatch, userInfo, successDelete]);

  return (
    <>
      <h1>Student Users</h1>

      {loadingDelete && <Loader />}
      {/* {errorDelete && <Message variant="danger">{errorDelete}</Message>} */}

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
                      {user.isRegistered}
                    </StyledTableCell>
                    <td>
                      <Link to={`/user/${user._id}/edit`}>
                        <Button variant="contained"> EDIT</Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        DELETE
                      </Button>
                    </td>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default StudentUserList;
