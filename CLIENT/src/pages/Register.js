import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Loader from "../share/Loader";
import Message from "../share/Message";
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
  const { loading, error, userInfo } = userRegister;

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

  // userInfo null if not loggedin.
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const onChange = (e) => {
    console.log(e.target.name);

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setMessage("passwords don't match");
    } else {
      const userData = {
        name,
        email,
        password,
        role,
      };

      // here send axios request instead.
      dispatch(register(name, email, password, role));
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "40%",
        display: "grid",
        gridTemplateColumns: "1fr",
      }}
    >
      <h1 className="my-3">Register</h1>
      {/* {error && <Message variant="danger">{error}</Message>} */}
      {loading && <Loader />}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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

        <Button type="submit" variant="contained">
          {" "}
          Sign Up
        </Button>

        <p>
          Already have an account?{" "}
          <span className="text-primary link-text">
            {" "}
            <Link to={`/login`}>Log In</Link>
          </span>
        </p>
      </Box>
    </div>
  );
};

export default Register;
