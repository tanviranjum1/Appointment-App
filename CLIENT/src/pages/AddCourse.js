import React, { Fragment, useState, useEffect } from "react";
import { addCourse } from "../actions/profileActions";

import { Link, useNavigate } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Loader from "../share/Loader";

import { useDispatch, useSelector } from "react-redux";
import { PROFILE_ADD_COURSE_RESET } from "../constants/profileConstant";
import { Button } from "@mui/material";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const AddCourse = () => {
  const [formData, setFormData] = useState({
    department: "",
    courseTitle: "",
  });

  const { department, courseTitle } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileAddCourse = useSelector((state) => state.profileAddCourse);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    course: createdCourse,
  } = profileAddCourse;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PROFILE_ADD_COURSE_RESET });
      navigate("/teacherdashboard");
    }
  }, [dispatch, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addCourse(formData));
  };

  return (
    <div>
      <h1 className="large text-primary">Add A Course</h1>

      <div>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <h1>{errorCreate}</h1>
        ) : (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                Department Name
              </InputLabel>
              <BootstrapInput
                id="component-department"
                type="text"
                name="department"
                required
                value={department}
                onChange={(e) => onChange(e)}
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                Course Name
              </InputLabel>
              <BootstrapInput
                id="component-course"
                type="text"
                name="courseTitle"
                required
                value={courseTitle}
                onChange={(e) => onChange(e)}
              />
            </FormControl>

            <Button type="submit" variant="outlined">
              Add
            </Button>
            <Link to="/teacherdashboard">Go Back</Link>
          </Box>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
