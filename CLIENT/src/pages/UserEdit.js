import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../share/Loader";
import Message from "../share/Message";
import { listUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstant";
import { TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

const UserEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isRegistered, setIsRegistered] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // pass user into useEffect dependency so it updates.
  useEffect(() => {
    // successupdate then reset the userState or update state and then redirect to userlist once updated.
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate(-1);
    } else {
      if (!user.name || user._id !== id) {
        dispatch(listUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setIsRegistered(user.isRegistered);
      }
    }
  }, [dispatch, id, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // UPDATE user.
    dispatch(
      updateUser({
        _id: id,
        name,
        email,
        role,
        isRegistered,
      })
    );
  };

  return (
    <>
      <button onClick={() => navigate(-1)}>Go back</button>
      <>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {/* {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <h1>Error</h1>
        ) : (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
              display: "flex",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <TextField
              id="name"
              type="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              label="Name"
              variant="outlined"
            />

            <TextField
              id="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="Email"
              variant="outlined"
            />

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                id="role"
                name="role"
                value={role}
                label="Role *"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRegistered == true}
                    onChange={(e) => setIsRegistered(!isRegistered)}
                  />
                }
                label="Registered"
              />
            </FormGroup>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Box>
        )}
      </>
    </>
  );
};

export default UserEdit;
