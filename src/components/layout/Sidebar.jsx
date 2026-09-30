import "./Sidebar.css";
import { NavLink } from "react-router-dom";
const menuItems = [
  { icon: "🏠", title: "Dashboard", path: "/dashboard" },
  { icon: "💊", title: "Medication", path: "/medication" },
  { icon: "⌚", title: "Wristband", path: "/wristband" },
  { icon: "🔔", title: "Alerts", path: "/alerts" },
  { icon: "📦", title: "Refill", path: "/refill" },
  { icon: "⚙️", title: "Settings", path: "/settings" },
];

export default function Sidebar({ darkMode }) {
  return (
    <aside className={`sidebar ${darkMode ? "dark-sidebar" : ""}`}>
      <div>
        <div className="sidebar-logo">
          <div className="logo-icon">💊</div>
          <div>
            <h2>AyushMithra</h2>
            <p>Medication Companion</p>
          </div>
        </div>

        <nav className="sidebar-menu">
        {menuItems.map((item) => (
  <NavLink
    key={item.title}
    to={item.path}
    className={({ isActive }) =>
      isActive ? "menu-item active-menu" : "menu-item"
    }
  >
    <span>{item.icon}</span>
    <span>{item.title}</span>
  </NavLink>
))}
        </nav>
      </div>

      <div className="patient-card">
        <img
          src="https://ui-avatars.com/api/?name=Lakshmi+Amma&background=22c55e&color=fff"
          alt="patient"
        />

        <div>
          <h4>Lakshmi Amma</h4>
          <p>Patient Connected</p>
        </div>
      </div>
    </aside>
  );

  
}