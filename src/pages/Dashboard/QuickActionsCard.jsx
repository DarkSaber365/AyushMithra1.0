import "./QuickActionsCard.css";
import { useNavigate } from "react-router-dom";
import {
  Pill,
  TriangleAlert,
  MapPin,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";

export default function QuickActionsCard({ darkMode }) {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Medication",
      subtitle: "Today's Schedule",
      icon: Pill,
      color: "green",
      route: "/medication",
    },
    {
      title: "Emergency SOS",
      subtitle: "View Alerts",
      icon: TriangleAlert,
      color: "red",
      route: "/alerts",
    },
    {
      title: "Live Location",
      subtitle: "GPS Safe Zone",
      icon: MapPin,
      color: "blue",
      route: "/wristband",
    },
    {
      title: "Weekly Refill",
      subtitle: "Dispenser Status",
      icon: RotateCcw,
      color: "emerald",
      route: "/refill",
    },
  ];

  return (
    <div
      className={`quick-actions-card ${
        darkMode ? "quick-dark" : "quick-light"
      }`}
    >
      {/* Header */}
      <div className="quick-header">
        <div>
          <span className="quick-label">
            QUICK ACTIONS
          </span>

          <h2>PillCare Controls</h2>
        </div>
      </div>

      {/* Actions */}
      <div className="actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className={`action-box ${action.color}`}
              onClick={() => navigate(action.route)}
            >
              <div className="action-icon">
                <Icon size={19} />
              </div>

              <div className="action-content">
                <h3>{action.title}</h3>

                <p>{action.subtitle}</p>
              </div>

              <ArrowUpRight
                className="action-arrow"
                size={16}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}