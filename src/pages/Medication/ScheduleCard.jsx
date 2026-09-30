import "./ScheduleCard.css";

export default function ScheduleCard({
  title,
  timeRange,
  color,
  schedules,
  darkMode,
}) {
  return (
    <div className={`schedule-card ${darkMode ? "dark-schedule" : ""}`}>

      <div className="schedule-header">
        <div
          className="schedule-icon"
          style={{ background: `${color}20`, color }}
        >
          {title.split(" ")[0]}
        </div>

        <div>
          <h3>{title.replace(title.split(" ")[0] + " ", "")}</h3>
          <p>{timeRange}</p>
        </div>
      </div>

      <div className="timeline-list">

        {schedules.map((dose, index) => (
          <div key={index} className="timeline-item">

            <div className="timeline-time">{dose.time}</div>

            <span
              className={`dose-status ${
                dose.status.toLowerCase()
              }`}
            >
              {dose.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}