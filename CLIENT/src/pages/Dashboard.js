import React, { useEffect, Fragment } from "react";
import { getProfile } from "../actions/teacherActions";
import Loader from "../share/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Availability from "./Availability";
import Courses from "./Courses";

const Dashboard = () => {
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
      {userInfo.role === "teacher" && (
        <>
          <h1>Teacher Dashboard</h1>
          <p>Welcome {userInfo?.name}</p>
          <Link to="/add-availability" className="link-button">
            <Button>Free Slot +</Button>
          </Link>
          <Link to="/add-courses" className="link-button">
            <Button>Course +</Button>
          </Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <h1>{error}</h1>
          ) : profile ? (
            <Fragment>
              <h3>Availability</h3>
              <Availability availability={profile.availability} />
              <h3>Courses</h3>
              <Courses courses={profile.courses} />
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet set up a profile, please add some info</p>
              <h1>Create Profile</h1>
            </Fragment>
          )}
        </>
      )}

      {userInfo.role === "admin" && (
        <>
          <h1>Admin Dashboard</h1>
          <p>Welcome {userInfo?.name}</p>
          <p>You can only check the user list</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
