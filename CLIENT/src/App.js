import SideBar from "./share/SideBar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./share/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Box from "@mui/material/Box";
import { DrawerHeader } from "./styles/DrawerHeader";
import UserEdit from "./pages/UserEdit";
import TeacherDashboard from "./pages/TeacherDashboard";
import AddAvailability from "./pages/AddAvailability";
import AddCourse from "./pages/AddCourse";
import StudentSearch from "./pages/StudentSearch";
import AppointmentSubmit from "./pages/AppointmentSubmit";
import AppointmentRequestList from "./pages/AppointmentRequestList";
import UserList from "./pages/UserList";
import StudentAppointmentList from "./pages/StudentAppointmentList";
import UserCreate from "./pages/UserCreate";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teacherdashboard" element={<TeacherDashboard />} />
            <Route path="/add-availability" element={<AddAvailability />} />
            <Route path="/add-courses" element={<AddCourse />} />
            <Route path="/student-search" element={<StudentSearch />} />
            <Route
              path="/appointment-submit/:s_id"
              element={<AppointmentSubmit />}
            />
            <Route
              path="/student/appointments"
              element={<StudentAppointmentList />}
            />
            <Route path="/users" element={<UserList />} />
            <Route
              path="/teacher/appointments"
              element={<AppointmentRequestList />}
            />
            <Route path="/user/create" element={<UserCreate />} />
            <Route path="/user/:id/edit" element={<UserEdit />} />
          </Routes>
        </Box>
      </Box>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
