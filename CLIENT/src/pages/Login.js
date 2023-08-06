import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import Loader from "../share/Loader";
import Message from "../share/Message";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// import { Form, Button, Row, Col } from "react-bootstrap";
// import FormContainer from "../../share/FormContainer";
// import { LinkContainer } from "react-router-bootstrap";

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
    // DISPATCH LOGIN
    dispatch(login(email, password));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="my-3">Log In</h1>
      {/* {error && <Message variant="danger">{error}</Message>} */}
      {loading && <Loader />}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
        sx={{
          "& > :not(style)": { m: 2 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={onChange}
          name="email"
        />

        <TextField
          id="password"
          label="Password"
          value={password}
          onChange={onChange}
          name="password"
        />

        <Button type="submit" variant="contained">
          {" "}
          Sign In
        </Button>
        <p>
          Create an account first?{" "}
          <span className="text-primary link-text">
            {" "}
            <Link to={`/register`}>Register</Link>
          </span>
        </p>
      </Box>
    </div>
  );
};

export default Login;
