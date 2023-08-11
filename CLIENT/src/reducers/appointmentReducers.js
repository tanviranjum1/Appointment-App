import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_RESET,
  APPOINTMENT_UPDATE_SUCCESS,
} from "../constants/appointmentConstant";

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_CREATE_SUCCESS:
      return { loading: false, success: true, appointments: action.payload };
    case APPOINTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentUpdateReducer = (
  state = { appointment: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_UPDATE_RESET:
      return { appointment: {} };
    default:
      return state;
  }
};
