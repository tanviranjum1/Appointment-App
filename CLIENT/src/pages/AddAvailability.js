import React, { useState, useEffect } from "react";
import { addAvailability } from "../actions/teacherActions";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Loader from "../share/Loader";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
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
    success: successCreate,
    availability: createdAvailability,
  } = profileAddAvailability;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TEACHER_PROFILE_ADD_AVAILABILITY_RESET });
      navigate("/teacherdashboard");
    }
  }, [dispatch, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();

    //TODO: work to send right data.
    // end time can't be less than start time.
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

    navigate(-1);
  };

  return (
    <div>
      <h1 className="large text-primary">Add A Free Slot</h1>

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={freeDate}
                  onChange={(newDate) => setFreeDate(newDate)}
                  label="Date"
                  id="component-date"
                  name="date"
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
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

export default AddAvailability;
