import axios from "axios";
import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
} from "../constants/appointmentConstant";
import { logout } from "./userActions";

export const createAppointment = (app) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/appointments`,
      app,
      config
    );

    dispatch({
      type: APPOINTMENT_CREATE_SUCCESS,
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
      type: APPOINTMENT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateAppointment = (appointment) => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_UPDATE_REQUEST,
    });

    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/appointments/${appointment._id}`,
      appointment,
      {}
    );

    dispatch({
      type: APPOINTMENT_UPDATE_SUCCESS,
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
      type: APPOINTMENT_UPDATE_FAIL,
      payload: message,
    });
  }
};
