import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createAppointment } from "../actions/appointmentActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// agenda, from, to, teacher name, course title.
// store to teacher table. isBooked = true.
// appointment table add request.
const AppointmentRequest = () => {
  const location = useLocation();
  const propsData = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dayjs.extend(utc);

  const [formData, setFormData] = useState({
    agenda: "",
    from: propsData.from,
    to: propsData.to,
    teachername: propsData.teacherName,
    teachercourses: propsData.teacherCourse,
    selectedcourse: propsData.teacherCourse[0],
  });

  // course dropdown.

  const { agenda, from, to, teachername, teachercourses, selectedcourse } =
    formData;

  const submitHandler = () => {
    console.log(formData);

    dispatch(createAppointment(formData));
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          display: "flex",
          flexDirection: "column",
          width: "75ch",
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <h2>Appointment Request</h2>
      <Button onClick={() => navigate(-1)} variant="outlined">
        Go back
      </Button>

      <TextField
        id="standard-multiline-static"
        label="Agenda"
        placeholder="write Agenda"
        multiline
        rows={2}
        variant="standard"
        focused
        value={agenda}
        onChange={changeHandler}
        name="agenda"
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedcourse}
          label="Teacher Course"
          onChange={changeHandler}
          name="selectedcourse"
        >
          {teachercourses &&
            teachercourses.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        id="standard-teachername"
        label="Teacher Name"
        type="text"
        variant="standard"
        value={teachername}
        focused
        name="teachername"
      />

      <TextField
        id="standard-from"
        type="text"
        variant="standard"
        value={dayjs.utc(from).format("HH:mm A")}
        name="from"
      />

      <TextField
        id="standard-to"
        type="text"
        variant="standard"
        value={dayjs.utc(to).format("HH:mm A")}
        name="to"
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AppointmentRequest;
