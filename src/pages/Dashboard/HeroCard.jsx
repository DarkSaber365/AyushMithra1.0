import "./HeroCard.css";
import { useEffect, useState } from "react";
import {
  Clock3,
  ShieldCheck,
  CircleCheck,
} from "lucide-react";
import { usePatient } from "../../context/PatientContext";

export default function HeroCard({ darkMode }) {
  const { patientData } = usePatient();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const gpsSafe = Number(patientData.gpsDistance) <= 200;

  return (
    <div
      className={`hero-card ${
        darkMode ? "hero-dark" : "hero-light"
      }`}
    >
      {/* HERO CONTENT */}
      <div
        className="hero-left"
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <span className="hero-tag">CARE OVERVIEW</span>

        <h1>Hello, Caretaker 👋</h1>

        <div className="hero-patient">
          <h2>{patientData.name}</h2>
          <span>Age {patientData.age}</span>
        </div>

        <p className="hero-description">
          Today's care is being monitored automatically.
          Medication activity, device status and patient
          safety are tracked from one place.
        </p>

        {/* Date & Time */}
        <div className="hero-date-time">
          <div className="date-row">
            <Clock3 size={18} />
            <span>{formattedDate}</span>
          </div>

          <strong>{formattedTime}</strong>
        </div>

        {/* Status Row */}
        <div className="hero-status-row">
          <div className="status-pill patient-status">
            <CircleCheck size={16} />
            Patient Stable
          </div>

          <div
            className={`status-pill ${
              gpsSafe ? "safe" : "warning"
            }`}
          >
            <ShieldCheck size={16} />

            {gpsSafe ? "Safe" : "Warning"}
          </div>
        </div>
      </div>
    </div>
  );
}