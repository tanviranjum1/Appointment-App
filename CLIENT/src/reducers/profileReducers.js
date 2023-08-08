import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  PROFILE_DELETE_COURSE_FAIL,
  PROFILE_DELETE_COURSE_REQUEST,
  PROFILE_DELETE_COURSE_SUCCESS,
  PROFILE_DELETE_AVAILABILITY_SUCCESS,
  PROFILE_DELETE_AVAILABILITY_FAIL,
  PROFILE_DELETE_AVAILABILITY_REQUEST,
  PROFILE_ADD_AVAILABILITY_FAIL,
  PROFILE_ADD_AVAILABILITY_REQUEST,
  PROFILE_ADD_AVAILABILITY_RESET,
  PROFILE_ADD_AVAILABILITY_SUCCESS,
  PROFILE_ADD_COURSE_FAIL,
  PROFILE_ADD_COURSE_REQUEST,
  PROFILE_ADD_COURSE_SUCCESS,
  PROFILE_ADD_COURSE_RESET,
} from "../constants/profileConstant";

export const profileReducer = (state = { profile: null }, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, loading: true };
    case PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileDeleteAvailabilityReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DELETE_AVAILABILITY_REQUEST:
      return { loadingDelete: true };
    case PROFILE_DELETE_AVAILABILITY_SUCCESS:
      return { loadingDelete: false, successDelete: true };
    case PROFILE_DELETE_AVAILABILITY_FAIL:
      return { loadingDelete: false, errorDelete: action.payload };
    default:
      return state;
  }
};

export const profileDeleteCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DELETE_COURSE_REQUEST:
      return { loadingDelete: true };
    case PROFILE_DELETE_COURSE_SUCCESS:
      return { loadingDelete: false, successDelete: true };
    case PROFILE_DELETE_COURSE_FAIL:
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
    case PROFILE_ADD_AVAILABILITY_REQUEST:
      return { loading: true };
    case PROFILE_ADD_AVAILABILITY_SUCCESS:
      return { loading: false, create: true };
    case PROFILE_ADD_AVAILABILITY_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_ADD_AVAILABILITY_RESET:
      return { availability: {} };
    default:
      return state;
  }
};

export const profileAddCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case PROFILE_ADD_COURSE_REQUEST:
      return { loading: true };
    case PROFILE_ADD_COURSE_SUCCESS:
      return { loading: false, create: true };
    case PROFILE_ADD_COURSE_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_ADD_COURSE_RESET:
      return { course: {} };
    default:
      return state;
  }
};
