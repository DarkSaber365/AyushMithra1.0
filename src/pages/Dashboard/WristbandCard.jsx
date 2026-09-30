import "./WristbandCard.css";
import {
  Watch,
  HeartPulse,
  BatteryMedium,
  MapPin,
  Droplet,
  Activity,
} from "lucide-react";
import { usePatient } from "../../context/PatientContext";

export default function WristbandCard({ darkMode }) {
  const { patientData } = usePatient();

  const gpsSafe = Number(patientData.gpsDistance) <= 200;

  const healthItems = [
    {
      label: "Heart Rate",
      value: `${patientData.heartRate}`,
      unit: "BPM",
      icon: HeartPulse,
      className: "heart",
    },
    {
      label: "SpO₂",
      value: `${patientData.spo2}`,
      unit: "%",
      icon: Droplet,
      className: "spo2",
    },
    {
      label: "Battery",
      value: `${patientData.battery}`,
      unit: "%",
      icon: BatteryMedium,
      className: "battery",
    },
    {
      label: "GPS",
      value: gpsSafe ? "Safe" : "Warning",
      unit: "",
      icon: MapPin,
      className: gpsSafe ? "gps-safe" : "gps-warning",
    },
  ];

  return (
    <div
      className={`wristband-card ${
        darkMode ? "wrist-dark" : "wrist-light"
      }`}
    >
      {/* Header */}
      <div className="wrist-header">
        <div className="wrist-title">
          <div className="wrist-title-icon">
            <Watch size={20} />
          </div>

          <div>
            <span className="card-label">SMART WRISTBAND</span>
            <h2>Device Status</h2>
          </div>
        </div>

        <div className="connection-status">
          <span className="live-dot"></span>
          <span>Online</span>
        </div>
      </div>

      {/* Device Summary */}
      <div className="wrist-summary">
        <div className="wrist-summary-icon">
          <Activity size={22} />
        </div>

        <div>
          <strong>Monitoring Active</strong>
          <span>
            Wristband sensors are currently reporting
            patient data.
          </span>
        </div>
      </div>

      {/* Health Grid */}
      <div className="health-grid">
        {healthItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`health-card ${item.className}`}
            >
              <div className="health-card-top">
                <div className="health-icon">
                  <Icon size={18} />
                </div>

                {item.label === "GPS" && (
                  <span className="gps-state-dot"></span>
                )}
              </div>

              <span className="health-label">
                {item.label}
              </span>

              <div className="health-value">
                <h3>{item.value}</h3>

                {item.unit && (
                  <span>{item.unit}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="wrist-footer">
        <span>
          Live sensor monitoring
        </span>

        <span className="wrist-footer-status">
          <span className="footer-live-dot"></span>
          ACTIVE
        </span>
      </div>
    </div>
  );
}