import axios from "axios";
import {
  TEACHER_PROFILE_REQUEST,
  TEACHER_PROFILE_SUCCESS,
  TEACHER_PROFILE_FAIL,
  TEACHER_PROFILE_DELETE_COURSE_FAIL,
  TEACHER_PROFILE_DELETE_COURSE_REQUEST,
  TEACHER_PROFILE_DELETE_AVAILABILITY_SUCCESS,
  TEACHER_PROFILE_DELETE_AVAILABILITY_FAIL,
  TEACHER_PROFILE_DELETE_AVAILABILITY_REQUEST,
  TEACHER_PROFILE_DELETE_COURSE_SUCCESS,
  TEACHER_PROFILE_ADD_AVAILABILITY_FAIL,
  TEACHER_PROFILE_ADD_AVAILABILITY_REQUEST,
  TEACHER_PROFILE_ADD_AVAILABILITY_SUCCESS,
  TEACHER_PROFILE_ADD_COURSE_FAIL,
  TEACHER_PROFILE_ADD_COURSE_REQUEST,
  TEACHER_PROFILE_ADD_COURSE_SUCCESS,
} from "../constants/teacherConstant";
import { logout } from "./userActions";

// Get current users profile . call it as soon as we go to the dashboard.
export const getProfile = () => async (dispatch, getState) => {
  //hit the api/profile/me in the backend which will give the profile of user logged in with the current token.

  try {
    // it will know the id from the token.
    // res.data. the route returns  the profile data.
    dispatch({ type: TEACHER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo.token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/teachers/profile/me`,
      config
    );

    dispatch({
      type: TEACHER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Add Course
export const addCourse = (formData) => async (dispatch, getState) => {
  try {
    console.log("reached here also");
    dispatch({
      type: TEACHER_PROFILE_ADD_COURSE_REQUEST,
    });

    //config since sending data.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/teachers/profile/course`,
      formData,
      config
    );

    dispatch({
      type: TEACHER_PROFILE_ADD_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: TEACHER_PROFILE_ADD_COURSE_FAIL,
      payload: message,
    });
  }
};

// // Add Availability
export const addAvailability = (formData) => async (dispatch, getState) => {
  try {
    console.log("reached here also");
    dispatch({
      type: TEACHER_PROFILE_ADD_AVAILABILITY_REQUEST,
    });

    //config since sending data.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/teachers/profile/availability`,
      formData,
      config
    );

    dispatch({
      type: TEACHER_PROFILE_ADD_AVAILABILITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: TEACHER_PROFILE_ADD_AVAILABILITY_FAIL,
      payload: message,
    });
  }
};

// Delete availability
export const deleteAvailability = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_PROFILE_DELETE_AVAILABILITY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/teachers/profile/availability/${id}`,
      config
    );

    dispatch({
      type: TEACHER_PROFILE_DELETE_AVAILABILITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: TEACHER_PROFILE_DELETE_AVAILABILITY_FAIL,
      payload: message,
    });
  }
};

// Delete course
export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_PROFILE_DELETE_COURSE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/teachers/profile/course/${id}`,
      config
    );

    dispatch({
      type: TEACHER_PROFILE_DELETE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: TEACHER_PROFILE_DELETE_COURSE_FAIL,
      payload: message,
    });
  }
};
