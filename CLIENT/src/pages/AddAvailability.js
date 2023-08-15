import React, { useState, useEffect } from "react";
import { addAvailability } from "../actions/teacherActions";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Loader from "../share/Loader";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useDispatch, useSelector } from "react-redux";
import { TEACHER_PROFILE_ADD_AVAILABILITY_RESET } from "../constants/teacherConstant";
import { Button } from "@mui/material";

const AddAvailability = () => {
  const [freeDate, setFreeDate] = useState(dayjs(new Date()));
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileAddAvailability = useSelector(
    (state) => state.profileAddAvailability
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    create: successCreate,
  } = profileAddAvailability;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TEACHER_PROFILE_ADD_AVAILABILITY_RESET });
      navigate("/");
    }
  }, [dispatch, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const jsDate = dayjs(freeDate).format("YYYY-MM-DD");
    const jsStartTime = dayjs(startTime).format("HH:mm:ss");
    const jsEndTime = dayjs(endTime).format("HH:mm:ss");

    const combinedStartTime = `${jsDate} ${jsStartTime}`;
    const combinedEndTime = `${jsDate} ${jsEndTime}`;

    dispatch(
      addAvailability({
        from: combinedStartTime,
        to: combinedEndTime,
      })
    );
  };

  return (
    <>
      {loadingCreate ? (
        <Loader />
      ) : errorCreate ? (
        <h1>{errorCreate}</h1>
      ) : (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 className="large text-primary">Add A Free Slot</h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker", "TimePicker", "TimePicker"]}
              sx={{
                "& > :not(style)": { m: 1 },
                display: "flex",
                flexDirection: "column",
                width: "40%",
                marginBottom: "20px",
              }}
            >
              <DatePicker
                label="Date"
                id="component-date"
                name="date"
                value={freeDate}
                onChange={(newDate) => setFreeDate(newDate)}
              />

              <TimePicker
                label="From"
                id="component-start-time"
                name="start-time"
                value={startTime}
                onChange={(newTime) => setStartTime(newTime)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />

              <TimePicker
                label="To"
                id="component-to-date"
                name="to"
                value={endTime}
                onChange={(newTime) => {
                  if (newTime <= startTime) {
                    alert("EndTime can't be less than start time.");
                    setEndTime("");
                  } else {
                    setEndTime(newTime);
                  }
                }}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Add
            </Button>
            <Link to="/" style={{ marginLeft: "20px" }}>
              Go Back
            </Link>
          </div>
        </Box>
      )}
    </>
  );
};

export default AddAvailability;
