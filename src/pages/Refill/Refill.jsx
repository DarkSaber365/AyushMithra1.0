import "./Refill.css";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { useMemo, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

import {
  CalendarDays,
  CheckCircle2,
  RotateCcw,
  PackageCheck,
  PackageOpen,
  Sunrise,
  Sun,
  Moon,
} from "lucide-react";

export default function Refill() {
  const { darkMode, setDarkMode } = useTheme();

  /* =====================================================
     WEEK DAYS
  ===================================================== */

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  /* =====================================================
     CURRENT DAY
  ===================================================== */

  const todayIndex = useMemo(() => {
    const jsDay = new Date().getDay();

    // JavaScript:
    // Sunday = 0
    // Monday = 1
    // ...
    // Saturday = 6

    return jsDay === 0 ? 6 : jsDay - 1;
  }, []);

  /* =====================================================
     WEEKLY REFILL STATE

     true  = prepared
     false = already dispensed
  ===================================================== */

  const [filledDays, setFilledDays] = useState(
    days.map((_, index) => index >= todayIndex)
  );

  /* =====================================================
     RESET WEEK
  ===================================================== */

  const resetWeek = () => {
    setFilledDays(days.map(() => true));
  };

  /* =====================================================
     PROGRESS
  ===================================================== */

  const filledCount = filledDays.filter(Boolean).length;

  const percentage = Math.round(
    (filledCount / days.length) * 100
  );



  return (
    <div
      className={`dashboard-page ${
        darkMode ? "dark" : "light"
      }`}
      style={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg,#020617,#0F172A,#111827)"
          : "linear-gradient(135deg,#ECFEF4,#F8FFFF)",
      }}
    >

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar darkMode={darkMode} />

      <main className="page-main">

        {/* =================================================
            TOPBAR
        ================================================= */}

        <Topbar
          title="Weekly Refill"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="refill-body">

          {/* =================================================
              PAGE HEADING
          ================================================= */}

          <div className="refill-heading">

            <span className="section-tag">
              WEEKLY REFILL
            </span>

            <div className="heading-row">

              <div>

                <h1>
                  Prepare This Week
                </h1>

                <p>
                  Prepare the medication compartments
                  for the upcoming week.
                </p>

              </div>

              <button
                className="reset-button"
                onClick={resetWeek}
              >
                <RotateCcw size={16} />

                Reset Weekly Refill
              </button>

            </div>

          </div>


          {/* =================================================
              WEEKLY PROGRESS
          ================================================= */}

          <div
            className={`progress-card ${
              darkMode
                ? "progress-dark"
                : "progress-light"
            }`}
          >

            <div className="progress-top">

              <div>

                <span className="progress-label">
                  WEEKLY STATUS
                </span>

                <h2>
                  {filledCount} of 7 Days Prepared
                </h2>

                <p>
                  Track which days are ready for
                  medication dispensing.
                </p>

              </div>


              <div className="progress-circle">

                <h1>
                  {percentage}%
                </h1>

                <span>
                  Ready
                </span>

              </div>

            </div>


            <div className="progress-bar-bg">

              <div
                className="progress-bar-fill"
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>


            <div className="progress-bottom">

              <div className="progress-info">

                <CheckCircle2 size={16} />

                <span>
                  {filledCount} Days Prepared
                </span>

              </div>


              <div className="progress-info">

                <CalendarDays size={16} />

                <span>
                  Weekly refill cycle
                </span>

              </div>

            </div>

          </div>


          


          {/* =================================================
              WEEKLY OVERVIEW
          ================================================= */}

          <div className="week-section">

            <div className="section-heading">

              <span className="section-mini-label">
                WEEKLY OVERVIEW
              </span>

              <h2>
                Refill Status
              </h2>

              <p>
                View the preparation status for each day.
              </p>

            </div>


            {/* =================================================
                COMPACT DAY CARDS
            ================================================= */}

            <div className="week-grid">

              {days.map((day, index) => {

                const filled = filledDays[index];

                return (
                  <div
                    key={day}
                    className={`day-card ${
                      filled
                        ? "filled-card"
                        : "empty-card"
                    }`}
                  >

                    {/* Day */}

                    <div className="day-header">

                      <h3>
                        {day}
                      </h3>

                      {index === todayIndex && (
                        <span className="today-badge">
                          Today
                        </span>
                      )}

                    </div>


                    {/* Small Status Icon */}

                    <div
                      className={`compact-status-icon ${
                        filled
                          ? "status-ready"
                          : "status-dispensed"
                      }`}
                    >

                      {filled ? (
                        <PackageCheck size={24} />
                      ) : (
                        <PackageOpen size={24} />
                      )}

                    </div>


                    {/* Status */}

                    <span
                      className={`status-pill ${
                        filled
                          ? "filled-pill"
                          : "empty-pill"
                      }`}
                    >
                      {filled
                        ? "Prepared"
                        : "Dispensed"}
                    </span>

                  </div>
                );

              })}

            </div>

          </div>


          {/* =================================================
              SIMPLE SUMMARY
          ================================================= */}

          <div className="summary-card">

            <div className="summary-heading">

              <div>

                <span className="section-mini-label">
                  REFILL SUMMARY
                </span>

                <h3>
                  Weekly Preparation
                </h3>

              </div>

              <CalendarDays size={19} />

            </div>


            <div className="summary-grid">

              <div className="summary-box">

                <span>
                  Prepared
                </span>

                <h2>
                  {filledCount}/7
                </h2>

              </div>


              <div className="summary-box">

                <span>
                  Remaining
                </span>

                <h2>
                  {7 - filledCount}
                </h2>

              </div>


              <div className="summary-box">

                <span>
                  Status
                </span>

                <h2>
                  {percentage === 100
                    ? "Fully Prepared"
                    : "In Progress"}
                </h2>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}