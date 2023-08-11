import {
  TEACHER_PROFILE_REQUEST,
  TEACHER_PROFILE_SUCCESS,
  TEACHER_PROFILE_FAIL,
  TEACHER_PROFILE_DELETE_COURSE_FAIL,
  TEACHER_PROFILE_DELETE_COURSE_REQUEST,
  TEACHER_PROFILE_DELETE_COURSE_SUCCESS,
  TEACHER_PROFILE_DELETE_AVAILABILITY_SUCCESS,
  TEACHER_PROFILE_DELETE_AVAILABILITY_FAIL,
  TEACHER_PROFILE_DELETE_AVAILABILITY_REQUEST,
  TEACHER_PROFILE_ADD_AVAILABILITY_FAIL,
  TEACHER_PROFILE_ADD_AVAILABILITY_REQUEST,
  TEACHER_PROFILE_ADD_AVAILABILITY_RESET,
  TEACHER_PROFILE_ADD_AVAILABILITY_SUCCESS,
  TEACHER_PROFILE_ADD_COURSE_FAIL,
  TEACHER_PROFILE_ADD_COURSE_REQUEST,
  TEACHER_PROFILE_ADD_COURSE_SUCCESS,
  TEACHER_PROFILE_ADD_COURSE_RESET,
} from "../constants/teacherConstant";

export const profileReducer = (state = { profile: null }, action) => {
  switch (action.type) {
    case TEACHER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case TEACHER_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case TEACHER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileDeleteAvailabilityReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_PROFILE_DELETE_AVAILABILITY_REQUEST:
      return { loadingDelete: true };
    case TEACHER_PROFILE_DELETE_AVAILABILITY_SUCCESS:
      return { loadingDelete: false, successDelete: true };
    case TEACHER_PROFILE_DELETE_AVAILABILITY_FAIL:
      return { loadingDelete: false, errorDelete: action.payload };
    default:
      return state;
  }
};

export const profileDeleteCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_PROFILE_DELETE_COURSE_REQUEST:
      return { loadingDelete: true };
    case TEACHER_PROFILE_DELETE_COURSE_SUCCESS:
      return { loadingDelete: false, successDelete: true };
    case TEACHER_PROFILE_DELETE_COURSE_FAIL:
      return { loadingDelete: false, errorDelete: action.payload };
    default:
      return state;
  }
};

export const profileAddAvailabilityReducer = (
  state = { availability: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_PROFILE_ADD_AVAILABILITY_REQUEST:
      return { loading: true };
    case TEACHER_PROFILE_ADD_AVAILABILITY_SUCCESS:
      return { loading: false, create: true };
    case TEACHER_PROFILE_ADD_AVAILABILITY_FAIL:
      return { loading: false, error: action.payload };
    case TEACHER_PROFILE_ADD_AVAILABILITY_RESET:
      return { availability: {} };
    default:
      return state;
  }
};

export const profileAddCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case TEACHER_PROFILE_ADD_COURSE_REQUEST:
      return { loading: true };
    case TEACHER_PROFILE_ADD_COURSE_SUCCESS:
      return { loading: false, create: true };
    case TEACHER_PROFILE_ADD_COURSE_FAIL:
      return { loading: false, error: action.payload };
    case TEACHER_PROFILE_ADD_COURSE_RESET:
      return { course: {} };
    default:
      return state;
  }
};
