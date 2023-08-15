import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createAppointment } from "../actions/appointmentActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacherAvailability } from "../actions/studentActions";

// agenda, from, to, teacher name, course title.
// store to teacher table. isBooked = true.
// appointment table add request.
const AppointmentSubmit = () => {
  const location = useLocation();
  const propsData = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { s_id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

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

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formData);

    // const { s_id } = s_id;

    // send edit request to teacher slot.
    const editSlotData = {
      teacherId: propsData.teacherId,
      slotId: s_id,
    };
    console.log(editSlotData);

    await dispatch(updateTeacherAvailability(editSlotData));

    const submitData = {
      agenda,
      start: from,
      end: to,
      courseTitle: selectedcourse,
      studentUserId: userInfo._id,
      teacherUserId: propsData.teacherUserId._id,
      status: "Submitted",
    };

    console.log("submitData", submitData);

    await dispatch(createAppointment(submitData));

    navigate("/student-search");
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
          marginBottom: "20px",
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
      width="40%"
    >
      <h2 style={{ margin: "0" }}>Create Appointment</h2>

      <TextField
        id="standard-multiline-static"
        label="Agenda"
        placeholder="write Agenda"
        multiline
        rows={3}
        focused
        value={agenda}
        onChange={changeHandler}
        name="agenda"
      />

      <FormControl sx={{ m: 1, width: "500px" }}>
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
        value={teachername}
        name="teachername"
        InputProps={{
          readOnly: true,
        }}
        disabled
      />

      <TextField
        id="standard-teacherdate"
        label="Teacher Available Date"
        type="text"
        value={dayjs(from).format("YYYY-MM-DD")}
        name="availabledate"
        InputProps={{
          readOnly: true,
        }}
        disabled
      />

      <TextField
        id="standard-from"
        type="text"
        value={dayjs.utc(from).format("HH:mm A")}
        name="from"
        label="Start Time"
        InputProps={{
          readOnly: true,
        }}
        disabled
      />

      <TextField
        id="standard-to"
        type="text"
        value={dayjs.utc(to).format("HH:mm A")}
        name="to"
        label="End Time"
        InputProps={{
          readOnly: true,
        }}
        disabled
      />

      <div>
        <Button variant="contained" size="large" type="submit">
          Submit
        </Button>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    </Box>
  );
};

export default AppointmentSubmit;
