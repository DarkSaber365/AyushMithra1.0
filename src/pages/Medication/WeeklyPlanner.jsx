import "./WeeklyPlanner.css";
import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  CalendarDays,
} from "lucide-react";

export default function WeeklyPlanner({ darkMode }) {
  const week = [
    {
      day: "Mon",
      date: 21,
      status: "taken",
    },
    {
      day: "Tue",
      date: 22,
      status: "missed",
    },
    {
      day: "Wed",
      date: 23,
      status: "pending",
    },
    {
      day: "Thu",
      date: 24,
      status: "today",
    },
    {
      day: "Fri",
      date: 25,
      status: "future",
    },
    {
      day: "Sat",
      date: 26,
      status: "future",
    },
    {
      day: "Sun",
      date: 27,
      status: "future",
    },
  ];

  const [selectedDay, setSelectedDay] = useState(3);

  const getIcon = (status) => {
    if (status === "taken") {
      return <CheckCircle2 size={19} />;
    }

    if (status === "pending") {
      return <AlertCircle size={19} />;
    }

    if (status === "missed") {
      return <XCircle size={19} />;
    }

    return null;
  };

  const getStatusLabel = (status) => {
    if (status === "taken") {
      return "Completed";
    }

    if (status === "missed") {
      return "Missed";
    }

    if (status === "pending") {
      return "Pending";
    }

    if (status === "today") {
      return "Today";
    }

    return "Upcoming";
  };

  return (
    <div
      className={`planner-card ${
        darkMode
          ? "planner-dark"
          : "planner-light"
      }`}
    >
      <div className="planner-header">

        <div className="planner-title">
          <div className="planner-title-icon">
            <CalendarDays size={18} />
          </div>

          <div>
            <span className="planner-label">
              WEEKLY OVERVIEW
            </span>

            <h2>
              Medication Planner
            </h2>
          </div>
        </div>

        <p>
          Weekly medication progress
        </p>

      </div>


      <div className="week-grid">

        {week.map((item, index) => (
          <button
            key={item.day}
            type="button"
            onClick={() =>
              setSelectedDay(index)
            }
            className={`day-card
              ${item.status}
              ${
                selectedDay === index
                  ? "selected-day"
                  : ""
              }`}
          >

            <span className="day-name">
              {item.day}
            </span>

            <h3>
              {item.date}
            </h3>

            <div className="status-icon">
              {getIcon(item.status)}
            </div>

            <small>
              {getStatusLabel(item.status)}
            </small>

          </button>
        ))}

      </div>

    </div>
  );
}