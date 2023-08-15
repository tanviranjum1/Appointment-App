import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import Loader from "../share/Loader";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const submitHandler = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Please add to the required field");
      return;
    }
    dispatch(login(email, password));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
      sx={{
        margin: "auto",
        display: "grid",
        gap: "20px",
      }}
      width="40%"
    >
      <h1>Log In</h1>
      {error && <h1>{error}</h1>}
      {loading && <Loader />}

      <TextField
        id="email"
        label="Email"
        value={email}
        onChange={onChange}
        name="email"
        type="email"
        fullWidth
        required
      />

      <TextField
        id="password"
        label="Password"
        value={password}
        onChange={onChange}
        name="password"
        type="password"
        fullWidth
        required
      />

      <div>
        <Button type="submit" variant="contained">
          {" "}
          Sign In
        </Button>
      </div>
      <p>
        Create an account first?{" "}
        <span className="text-primary link-text">
          {" "}
          <Link to={`/register`}>Register</Link>
        </span>
      </p>
    </Box>
  );
};

export default Login;
