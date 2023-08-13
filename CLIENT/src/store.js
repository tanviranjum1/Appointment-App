import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userCreateReducer,
  userDeleteReducer,
  userUpdateReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  profileReducer,
  profileDeleteAvailabilityReducer,
  profileDeleteCourseReducer,
  profileAddAvailabilityReducer,
  profileAddCourseReducer,
  appointmentListForTeacherReducer,
} from "./reducers/teacherReducers";
import {
  searchTeacherReducer,
  listCoursesAndDepartmentsReducer,
  studentUpdateTeacherSlotReducer,
  studentAppointmentListReducer,
  studentProfileCreateReducer,
} from "./reducers/studentReducers";

import {
  appointmentCreateReducer,
  appointmentUpdateReducer,
} from "./reducers/appointmentReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userProfile: profileReducer,
  profileDeleteCourse: profileDeleteCourseReducer,
  profileDeleteAvailability: profileDeleteAvailabilityReducer,
  profileAddAvailability: profileAddAvailabilityReducer,
  profileAddCourse: profileAddCourseReducer,
  searchTeacher: searchTeacherReducer,
  dropdownCoursesAndDepartments: listCoursesAndDepartmentsReducer,
  appointmentCreate: appointmentCreateReducer,
  studentUpdateSlot: studentUpdateTeacherSlotReducer,
  appointmentListForTeacher: appointmentListForTeacherReducer,
  appointmentUpdate: appointmentUpdateReducer,
  studentAppointmentList: studentAppointmentListReducer,
  studentProfileCreate: studentProfileCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
