import "./AlertCard.css";
import {
  BellRing,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { usePatient } from "../../context/PatientContext";

export default function AlertCard({ darkMode }) {
  const { patientData } = usePatient();

  const latestAlert = patientData.alerts?.[0];

  const getAlertType = (type) => {
    if (type === "critical") {
      return {
        label: "Critical",
        icon: AlertTriangle,
        className: "critical",
      };
    }

    if (type === "success") {
      return {
        label: "Resolved",
        icon: CheckCircle2,
        className: "success",
      };
    }

    return {
      label: "Attention",
      icon: BellRing,
      className: "warning",
    };
  };

  const alertType = latestAlert
    ? getAlertType(latestAlert.type)
    : {
        label: "All Clear",
        icon: CheckCircle2,
        className: "success",
      };

  const AlertIcon = alertType.icon;

  return (
    <div
      className={`alert-card ${
        darkMode ? "alert-dark" : "alert-light"
      }`}
    >
      {/* Header */}
      <div className="alert-card-header">
        <div>
          <span className="alert-label">
            ATTENTION NEEDED
          </span>

          <h2>Recent Alert</h2>
        </div>

        <div className="alert-header-icon">
          <BellRing size={19} />
        </div>
      </div>

      {/* Alert Content */}
      {latestAlert ? (
        <div className={`alert-content ${alertType.className}`}>
          <div className="alert-icon">
            <AlertIcon size={21} />
          </div>

          <div className="alert-details">
            <div className="alert-title-row">
              <h3>{latestAlert.title}</h3>

              <span className="alert-type">
                {alertType.label}
              </span>
            </div>

            <p>{latestAlert.description}</p>

            <span className="alert-time">
              {latestAlert.time}
            </span>
          </div>
        </div>
      ) : (
        <div className="alert-content success">
          <div className="alert-icon">
            <CheckCircle2 size={21} />
          </div>

          <div className="alert-details">
            <div className="alert-title-row">
              <h3>No active alerts</h3>

              <span className="alert-type">
                All Clear
              </span>
            </div>

            <p>
              There are currently no alerts requiring
              attention.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="alert-card-footer">
        <span>
          Full alert history is available in Alerts.
        </span>

        <ArrowRight size={17} />
      </div>
    </div>
  );
}