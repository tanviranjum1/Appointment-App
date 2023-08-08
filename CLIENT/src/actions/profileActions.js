import axios from "axios";
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  PROFILE_DELETE_COURSE_FAIL,
  PROFILE_DELETE_COURSE_REQUEST,
  PROFILE_DELETE_AVAILABILITY_SUCCESS,
  PROFILE_DELETE_AVAILABILITY_FAIL,
  PROFILE_DELETE_AVAILABILITY_REQUEST,
  PROFILE_DELETE_COURSE_SUCCESS,
  PROFILE_ADD_AVAILABILITY_FAIL,
  PROFILE_ADD_AVAILABILITY_REQUEST,
  PROFILE_ADD_AVAILABILITY_SUCCESS,
  PROFILE_ADD_COURSE_FAIL,
  PROFILE_ADD_COURSE_REQUEST,
  PROFILE_ADD_COURSE_SUCCESS,
} from "../constants/profileConstant";
import { logout } from "../actions/userActions";

// Get current users profile . call it as soon as we go to the dashboard.
export const getProfile = () => async (dispatch, getState) => {
  //hit the api/profile/me in the backend which will give the profile of user logged in with the current token.

  try {
    // it will know the id from the token.
    // res.data. the route returns  the profile data.
    dispatch({ type: PROFILE_REQUEST });

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
      type: PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
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
      type: PROFILE_ADD_COURSE_REQUEST,
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
      type: PROFILE_ADD_COURSE_SUCCESS,
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
      type: PROFILE_ADD_COURSE_FAIL,
      payload: message,
    });
  }
};

// // Add Availability
export const addAvailability = (formData) => async (dispatch, getState) => {
  try {
    console.log("reached here also");
    dispatch({
      type: PROFILE_ADD_AVAILABILITY_REQUEST,
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
      type: PROFILE_ADD_AVAILABILITY_SUCCESS,
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
      type: PROFILE_ADD_AVAILABILITY_FAIL,
      payload: message,
    });
  }
};

// Delete availability
export const deleteAvailability = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_DELETE_AVAILABILITY_REQUEST,
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
      type: PROFILE_DELETE_AVAILABILITY_SUCCESS,
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
      type: PROFILE_DELETE_AVAILABILITY_FAIL,
      payload: message,
    });
  }
};

// Delete course
export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_DELETE_COURSE_REQUEST,
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
      type: PROFILE_DELETE_COURSE_SUCCESS,
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
      type: PROFILE_DELETE_COURSE_FAIL,
      payload: message,
    });
  }
};
