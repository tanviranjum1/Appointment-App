import axios from "axios";
import {
  STUDENT_GET_COURSES_DEPARTMENTS_REQUEST,
  STUDENT_GET_COURSES_DEPARTMENTS_SUCCESS,
  STUDENT_GET_COURSES_DEPARTMENTS_FAIL,
  STUDENT_SEARCH_TEACHER_FAIL,
  STUDENT_SEARCH_TEACHER_REQUEST,
  STUDENT_SEARCH_TEACHER_SUCCESS,
  STUDENT_UPDATE_AVAILABILITY_FAIL,
  STUDENT_UPDATE_AVAILABILITY_REQUEST,
  STUDENT_UPDATE_AVAILABILITY_RESET,
  STUDENT_UPDATE_AVAILABILITY_SUCCESS,
} from "../constants/studentConstant";
import { logout } from "./userActions";

export const listCoursesAndDepartments = () => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_GET_COURSES_DEPARTMENTS_REQUEST,
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/students/getCoursesAndDepartments`,
      {}
    );

    dispatch({
      type: STUDENT_GET_COURSES_DEPARTMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_GET_COURSES_DEPARTMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchTeachers = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_SEARCH_TEACHER_REQUEST,
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/students/searchTeacher`,
      formData
    );

    dispatch({
      type: STUDENT_SEARCH_TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_SEARCH_TEACHER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTeacherAvailability =
  (slotData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_UPDATE_AVAILABILITY_REQUEST,
      });

      const { slotId } = slotData;

      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/students/updateTeacherAvailability/${slotId}`,
        slotData,
        {}
      );

      dispatch({
        type: STUDENT_UPDATE_AVAILABILITY_SUCCESS,
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
        type: STUDENT_UPDATE_AVAILABILITY_FAIL,
        payload: message,
      });
    }
  };
