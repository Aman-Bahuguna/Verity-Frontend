import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Landing from "./pages/Landing";

// Pages (to be built)
// import Chat from "./pages/Chat";
// import Admin from "./pages/Admin";
// import Login from "./pages/Login";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/chat" element={<Chat />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </MotionConfig>
  );
}
