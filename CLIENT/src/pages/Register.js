import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Loader from "../share/Loader";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo, success } = userRegister;

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
        console.log("user_id", userInfo._id);
        await dispatch(
          register({ studentId, department, userId: userInfo._id })
        );
      };
      profileCreator();
    }
  }, [userInfo, success]);

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
        await dispatch(register(name, email, password, role));
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
        margin: "auto",
        display: "grid",
        gap: "20px",
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      width="40%"
    >
      <h1>Register</h1>
      {error && <h1>{error}</h1>}
      {loading && <Loader />}
      {message && <h1>{message}</h1>}

      <TextField
        id="name"
        type="name"
        name="name"
        onChange={onChange}
        value={name}
        label="Name"
        variant="outlined"
        fullWidth
      />

      <TextField
        id="email"
        type="email"
        name="email"
        onChange={onChange}
        value={email}
        label="Email"
        variant="outlined"
        fullWidth
      />

      <FormControl required fullWidth>
        <InputLabel id="role">Role</InputLabel>
        <Select
          labelId="role"
          id="role"
          name="role"
          value={role}
          label="Role *"
          onChange={onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>
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
            fullWidth
          />

          <TextField
            id="department"
            type="text"
            name="department"
            onChange={(event) => setDepartment(event.target.value)}
            value={department}
            label="Department"
            variant="outlined"
            fullWidth
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
        fullWidth
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
        fullWidth
      />

      <div>
        <Button type="submit" variant="contained" size="large">
          {" "}
          Sign Up
        </Button>
      </div>

      <p>
        Already have an account?{" "}
        <span>
          {" "}
          <Link to={`/login`}>Log In</Link>
        </span>
      </p>
    </Box>
  );
};

export default Register;
