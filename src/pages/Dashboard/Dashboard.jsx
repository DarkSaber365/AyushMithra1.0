import "./Dashboard.css";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import HeroCard from "./HeroCard";
import MedicineCard from "./MedicineCard";
import WristbandCard from "./WristbandCard";
import AdherenceCard from "./AdherenceCard";
import AlertCard from "./AlertCard";
import QuickActionsCard from "./QuickActionsCard";

import { useTheme } from "../../context/ThemeContext";

export default function Dashboard() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div
      className={`dashboard-page ${darkMode ? "dark" : "light"}`}
      style={{
        display: "flex",
        height: "100vh",
        background: darkMode
          ? "linear-gradient(135deg, #020617, #0F172A, #111827)"
          : "linear-gradient(135deg, #ECFEF4, #F8FFFF)",
        transition: "0.3s ease",
      }}
    >
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          height: "100vh",
        }}
      >
        {/* Top Navigation */}
        <Topbar
          title="Dashboard"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Dashboard Body */}
        <div className="dashboard-body">

          {/* Quick Actions Bar */}
          <div className="quick-actions-top">
            <QuickActionsCard darkMode={darkMode} />
          </div>

          {/* Hero Card */}
          <div className="hero-section">
            <HeroCard darkMode={darkMode} />
          </div>

          {/* Middle Row */}
          <div className="middle-grid">
            <MedicineCard darkMode={darkMode} />
            <WristbandCard darkMode={darkMode} />
          </div>

          {/* Bottom Row */}
          <div className="bottom-grid">
            <AdherenceCard darkMode={darkMode} />
            <AlertCard darkMode={darkMode} />
          </div>

        </div>
      </main>
    </div>
  );
}