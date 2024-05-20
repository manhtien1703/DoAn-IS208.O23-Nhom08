import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import RoomSchedule from "../pages/RoomSchedule";
import Profile from "../pages/Profile/Profile";
import News from "../pages/News";
import TextEditor from "../components/TextEditor/TextEditor";

const WebRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        }
      />
      <Route
        path="/room-schedule"
        element={
          <ProtectedRoute>
            <RoomSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/Test" element={<TextEditor />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default WebRoutes;
