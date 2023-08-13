import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCreateAction } from "../actions/userActions";
import { createStudentProfile } from "../actions/studentActions";
import Loader from "../share/Loader";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const UserCreate = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const userCreate = useSelector((state) => state.userCreate);
  const {
    loading: loadingUserCreate,
    error: errorUserCreate,
    user,
    success: successUserCreate,
  } = userCreate;

  const studentProfileCreate = useSelector(
    (state) => state.studentProfileCreate
  );

  const {
    loading: loadingCreate,
    error: errorCreate,
    profile: profileCreated,
  } = studentProfileCreate;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });
  const [message, setMessage] = useState(null);

  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");

  const { name, email, password, password2, role } = formData;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    } else if (role === "student") {
      const profileCreator = async () => {
        console.log("user_id", user._id);
        await dispatch(
          createStudentProfile({ studentId, department, userId: user._id })
        );
      };
      profileCreator();
    }
  }, [userInfo, successUserCreate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setMessage("Passwords don't match");
    } else {
      try {
        await dispatch(userCreateAction(name, email, password, role));
        navigate("/users");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      width="40%"
    >
      <h1>Create New User</h1>
      {loading && <Loader />}
      <TextField
        id="name"
        type="name"
        name="name"
        onChange={onChange}
        value={name}
        label="Name"
        variant="outlined"
      />

      <TextField
        id="email"
        type="email"
        name="email"
        onChange={onChange}
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
          onChange={onChange}
        >
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

      {role == "student" && (
        <>
          <TextField
            id="studentId"
            type="text"
            name="studentId"
            onChange={(event) => setStudentId(event.target.value)}
            value={studentId}
            label="Student ID"
            variant="outlined"
          />

          <TextField
            id="department"
            type="text"
            name="department"
            onChange={(event) => setDepartment(event.target.value)}
            value={department}
            label="Department"
            variant="outlined"
          />
        </>
      )}

      <TextField
        id="password"
        type="password"
        onChange={onChange}
        name="password"
        value={password}
        label="Password"
        variant="outlined"
      />

      <TextField
        id="password2"
        type="password"
        placeholder="Enter confirm password"
        onChange={onChange}
        name="password2"
        value={password2}
        label="Confirm Password"
        variant="outlined"
      />

      <div>
        <Button type="submit" variant="contained" size="large">
          {" "}
          Create
        </Button>
      </div>
    </Box>
  );
};

export default UserCreate;
