import {
  STUDENT_GET_COURSES_DEPARTMENTS_REQUEST,
  STUDENT_GET_COURSES_DEPARTMENTS_SUCCESS,
  STUDENT_GET_COURSES_DEPARTMENTS_FAIL,
  STUDENT_SEARCH_TEACHER_FAIL,
  STUDENT_SEARCH_TEACHER_REQUEST,
  STUDENT_SEARCH_TEACHER_SUCCESS,
  STUDENT_UPDATE_AVAILABILITY_REQUEST,
  STUDENT_UPDATE_AVAILABILITY_SUCCESS,
  STUDENT_UPDATE_AVAILABILITY_FAIL,
  STUDENT_UPDATE_AVAILABILITY_RESET,
  STUDENT_LIST_APPOINTMENT_REQUEST,
  STUDENT_LIST_APPOINTMENT_FAIL,
  STUDENT_LIST_APPOINTMENT_SUCCESS,
  STUDENT_CREATE_PROFILE_REQUEST,
  STUDENT_CREATE_PROFILE_SUCCESS,
  STUDENT_CREATE_PROFILE_FAIL,
  STUDENT_CREATE_PROFILE_RESET,
} from "../constants/studentConstant";

export const listCoursesAndDepartmentsReducer = (
  state = { lists: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_GET_COURSES_DEPARTMENTS_REQUEST:
      return { loading: true, lists: [] };
    case STUDENT_GET_COURSES_DEPARTMENTS_SUCCESS:
      return {
        loading: false,
        lists: action.payload,
      };
    case STUDENT_GET_COURSES_DEPARTMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchTeacherReducer = (state = { teachers: [] }, action) => {
  switch (action.type) {
    case STUDENT_SEARCH_TEACHER_REQUEST:
      return { loading: true, teachers: [] };
    case STUDENT_SEARCH_TEACHER_SUCCESS:
      return {
        loading: false,
        teachers: action.payload,
      };
    case STUDENT_SEARCH_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentUpdateTeacherSlotReducer = (
  state = { slot: {} },
  action
) => {
  switch (action.type) {
    case STUDENT_UPDATE_AVAILABILITY_REQUEST:
      return { loading: true };
    case STUDENT_UPDATE_AVAILABILITY_SUCCESS:
      return { loading: false, success: true };
    case STUDENT_UPDATE_AVAILABILITY_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_UPDATE_AVAILABILITY_RESET:
      return { slot: {} };
    default:
      return state;
  }
};

export const studentAppointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_LIST_APPOINTMENT_REQUEST:
      return { loading: true, appointments: [] };
    case STUDENT_LIST_APPOINTMENT_SUCCESS:
      return {
        loading: false,
        appointments: action.payload,
      };
    case STUDENT_LIST_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentProfileCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_CREATE_PROFILE_REQUEST:
      return { loading: true };
    case STUDENT_CREATE_PROFILE_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case STUDENT_CREATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_CREATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
