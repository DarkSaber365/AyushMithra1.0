import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Medication from "./pages/Medication/Medication";
import Wristband from "./pages/Wristband/Wristband";
import Alerts from "./pages/Alerts/Alerts";
import Refill from "./pages/Refill/Refill";
import Settings from "./pages/Settings/Settings";

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/AyushMithra1.0">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medication" element={<Medication />} />
          <Route path="/wristband" element={<Wristband />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/refill" element={<Refill />} />
          <Route path="/settings" element={<Settings />} />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;