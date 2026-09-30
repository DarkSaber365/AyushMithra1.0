import "./MedicineCard.css";
import {
  Sun,
  CloudSun,
  Moon,
  CheckCircle2,
  Circle,
  ArrowRight,
} from "lucide-react";
import { usePatient } from "../../context/PatientContext";

export default function MedicineCard({ darkMode }) {
  const { patientData, getAdherence } = usePatient();

  const adherence = getAdherence();

  const schedules = [
    {
      key: "morning",
      label: "Morning",
      time: "8:00 AM",
      icon: Sun,
    },
    {
      key: "afternoon",
      label: "Afternoon",
      time: "2:00 PM",
      icon: CloudSun,
    },
    {
      key: "night",
      label: "Night",
      time: "8:00 PM",
      icon: Moon,
    },
  ];

  return (
    <div
      className={`medicine-card ${
        darkMode ? "medicine-dark" : "medicine-light"
      }`}
    >
      {/* Header */}
      <div className="medicine-card-header">
        <div>
          <span className="card-label">TODAY'S MEDICATION</span>

          <h2>Medication Schedule</h2>
        </div>

        <div className="medicine-progress">
          <strong>
            {adherence.taken}/{adherence.total}
          </strong>

          <span>completed</span>
        </div>
      </div>

      {/* Progress */}
      <div className="medicine-progress-bar">
        <div
          className="medicine-progress-fill"
          style={{
            width: `${adherence.percentage}%`,
          }}
        />
      </div>

      {/* Schedule */}
      <div className="medicine-schedule">
        {schedules.map((schedule) => {
          const Icon = schedule.icon;

          const taken =
            patientData.medicationStatus[schedule.key];

          return (
            <div
              key={schedule.key}
              className={`medicine-row ${
                taken ? "medicine-taken" : "medicine-pending"
              }`}
            >
              {/* Time Icon */}
              <div className="medicine-time-icon">
                <Icon size={19} />
              </div>

              {/* Information */}
              <div className="medicine-row-info">
                <h3>{schedule.label}</h3>

                <span>{schedule.time}</span>
              </div>

              {/* Status */}
              <div
                className={`medicine-row-status ${
                  taken ? "taken" : "pending"
                }`}
              >
                {taken ? (
                  <>
                    <CheckCircle2 size={17} />
                    Taken
                  </>
                ) : (
                  <>
                    <Circle size={17} />
                    Pending
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="medicine-card-footer">
        <span>
          {adherence.percentage === 100
            ? "All scheduled doses completed"
            : "Medication progress updates automatically"}
        </span>

        <ArrowRight size={17} />
      </div>
    </div>
  );
}