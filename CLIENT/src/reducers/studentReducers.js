import {
  STUDENT_GET_COURSES_DEPARTMENTS_REQUEST,
  STUDENT_GET_COURSES_DEPARTMENTS_SUCCESS,
  STUDENT_GET_COURSES_DEPARTMENTS_FAIL,
  STUDENT_SEARCH_TEACHER_FAIL,
  STUDENT_SEARCH_TEACHER_REQUEST,
  STUDENT_SEARCH_TEACHER_SUCCESS,
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
