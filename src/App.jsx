import { Routes, Route, Navigate } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Landing from "./pages/Landing";
import { AuthLayout, SignIn, SignUp } from "./pages/Auth";
import { ToastProvider } from "./components";

// Pages (to be built)
// import Chat from "./pages/Chat";
// import Admin from "./pages/Admin";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Navigate to="/sign-in" replace />} />
            <Route path="/signup" element={<Navigate to="/sign-up" replace />} />
          </Route>
          {/* <Route path="/chat" element={<Chat />} /> */}
          {/* <Route path="/admin" element={<Admin />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </MotionConfig>
  );
}
