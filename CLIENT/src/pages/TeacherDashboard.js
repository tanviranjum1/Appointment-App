import React, { useEffect, Fragment } from "react";
import { getProfile } from "../actions/teacherActions";
import Loader from "../share/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Availability from "./Availability";
import Courses from "./Courses";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, profile } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getProfile());
    }
  }, [dispatch, userInfo, getProfile]);

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Welcome {userInfo && userInfo.name}</p>
      <Link to="/add-courses">
        <Button variant="contained"> Add Course</Button>
      </Link>
      <Link to="/add-availability">
        <Button variant="contained"> Add Free Slot</Button>
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : profile != null ? (
        <Fragment>
          <Availability availability={profile.availability} />
          <Courses courses={profile.courses} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <h1>Create Profile</h1>
        </Fragment>
      )}
    </div>
  );
};

export default TeacherDashboard;
