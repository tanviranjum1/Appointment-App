import SideBar from "./share/SideBar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./share/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TeacherUserList from "./pages/TeacherUserList";

import Box from "@mui/material/Box";
import { DrawerHeader } from "./styles/DrawerHeader";
import StudentUserList from "./pages/StudentUserList";
import UnregisteredUserList from "./pages/UnregisteredUserList";
import UserEdit from "./pages/UserEdit";

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
            <Route path="/teacherusers" element={<TeacherUserList />} />
            <Route path="/studentusers" element={<StudentUserList />} />
            <Route
              path="/unregisteredusers"
              element={<UnregisteredUserList />}
            />
            <Route path="/user/:id/edit" element={<UserEdit />} />
          </Routes>
        </Box>
      </Box>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
