import "./AdherenceCard.css";
import {
  CircleCheckBig,
  TrendingUp,
} from "lucide-react";
import { usePatient } from "../../context/PatientContext";

export default function AdherenceCard({ darkMode }) {
  const { getAdherence } = usePatient();

  const adherence = getAdherence();

  const isComplete = adherence.percentage === 100;

  const status =
    adherence.percentage >= 67
      ? "On Track"
      : "Needs Attention";

  return (
    <div
      className={`adherence-card ${
        darkMode ? "adherence-dark" : "adherence-light"
      }`}
    >
      {/* Header */}
      <div className="adherence-header">
        <div>
          <span className="adherence-label">
            CARE PROGRESS
          </span>

          <h2>Today's Adherence</h2>
        </div>

        <div className="adherence-icon">
          <CircleCheckBig size={20} />
        </div>
      </div>

      {/* Main Progress */}
      <div className="adherence-main">
        <div
          className="adherence-ring"
          style={{
            "--progress": `${adherence.percentage}%`,
          }}
        >
          <div className="adherence-ring-inner">
            <strong>{adherence.percentage}%</strong>
            <span>Today</span>
          </div>
        </div>

        <div className="adherence-info">
          <div className="adherence-status">
            <span className="adherence-status-dot"></span>
            {status}
          </div>

          <h3>
            {adherence.taken} of {adherence.total}
          </h3>

          <p>
            scheduled doses completed today.
          </p>
        </div>
      </div>

      {/* Bottom Insight */}
      <div className="adherence-insight">
        <div className="insight-icon">
          <TrendingUp size={16} />
        </div>

        <span>
          {isComplete
            ? "All scheduled doses are complete."
            : "Medication progress is updated automatically."}
        </span>
      </div>
    </div>
  );
}