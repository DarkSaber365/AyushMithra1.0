import "./Topbar.css";
import {
  Search,
  Bell,
  Moon,
  Sun,
  CalendarDays,
} from "lucide-react";

export default function Topbar({ title, darkMode, setDarkMode }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className={`topbar ${darkMode ? "dark-topbar" : "light-topbar"}`}>

      {/* Left */}
      <div className="topbar-left">

        <h1 className={darkMode ? "dark-title" : "light-title"}>
          {title}
        </h1>

        <div className="date-box">
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>
      </div>

      {/* Right */}
      <div className="topbar-right">

        <div className="search-pill">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search medicines, patients, reminders..."
          />
        </div>

        <button className="glass-icon notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button
          className={`theme-switch ${darkMode ? "switch-dark" : "switch-light"}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          <div className={`switch-circle ${darkMode ? "move" : ""}`}>
            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
          </div>
        </button>

        <div className="avatar-box">
          LA
        </div>
      </div>
    </header>
  );
}