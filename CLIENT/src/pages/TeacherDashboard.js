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
  const { userInfo } = userLogin; // get user id. need role too.

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, profile } = userProfile;

  console.log("profile", profile);

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
      <p>
        <i></i>Welcome {userInfo && userInfo.name}
      </p>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : profile != null ? (
        <Fragment>
          <div className="dash-buttons">
            <Link to="/add-courses">
              <Button variant="contained"> Add Courses</Button>
            </Link>
            <Link to="/add-availability">
              <Button variant="contained"> Add Availability</Button>
            </Link>
          </div>
          <Availability availability={profile.availability} />
          <Courses courses={profile.courses} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default TeacherDashboard;
