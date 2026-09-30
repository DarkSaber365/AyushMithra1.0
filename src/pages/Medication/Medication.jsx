import "./Medication.css";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import WeeklyPlanner from "./WeeklyPlanner";


import { useEffect, useMemo, useState } from "react";
import { usePatient } from "../../context/PatientContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Clock3,
  CheckCircle2,
  Pill,
  HeartPulse,
  BatteryMedium,
  MapPin,
} from "lucide-react";

export default function Medication() {
  const { darkMode, setDarkMode } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  const {
    patientData,
    markMedicineTaken,
    getAdherence,
  } = usePatient();

  const adherence = getAdherence();

  /*
   * Medication schedule
   *
   * The dispenser automatically releases the
   * scheduled dose. Once the scheduled time is
   * reached, the dose is considered taken.
   */
  const schedules = useMemo(
    () => [
      {
        key: "morning",
        label: "Morning",
        time: "8:00 AM",
        hour: 8,
        minute: 0,
        icon: "🌅",
      },
      {
        key: "afternoon",
        label: "Afternoon",
        time: "2:00 PM",
        hour: 14,
        minute: 0,
        icon: "☀️",
      },
      {
        key: "night",
        label: "Night",
        time: "8:00 PM",
        hour: 20,
        minute: 0,
        icon: "🌙",
      },
    ],
    []
  );

  /*
   * Keep the page clock updated.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /*
   * Automatically mark a medication as taken
   * once its scheduled dispensing time is reached.
   *
   * This is the website-side demonstration of
   * automatic dispenser behavior.
   */
  useEffect(() => {
    schedules.forEach((schedule) => {
      const scheduledMinutes =
        schedule.hour * 60 + schedule.minute;

      const currentMinutes =
        currentTime.getHours() * 60 +
        currentTime.getMinutes();

      if (
        currentMinutes >= scheduledMinutes &&
        !patientData.medicationStatus[schedule.key]
      ) {
        markMedicineTaken(schedule.key);
      }
    });
  }, [
    currentTime,
    schedules,
    patientData.medicationStatus,
    markMedicineTaken,
  ]);

  /*
   * Find the next medication that has not
   * been completed yet.
   */
  const nextDose = useMemo(() => {
    const currentMinutes =
      currentTime.getHours() * 60 +
      currentTime.getMinutes();

    const remaining = schedules.filter(
      (schedule) =>
        !patientData.medicationStatus[schedule.key]
    );

    if (remaining.length === 0) {
      return null;
    }

    const upcoming = remaining.find(
      (schedule) =>
        schedule.hour * 60 + schedule.minute >
        currentMinutes
    );

    return upcoming || null;
  }, [
    currentTime,
    schedules,
    patientData.medicationStatus,
  ]);

  /*
   * Calculate countdown to the next dose.
   */
  const countdown = useMemo(() => {
    if (!nextDose) {
      return "All Complete";
    }

    const target = new Date(currentTime);

    target.setHours(
      nextDose.hour,
      nextDose.minute,
      0,
      0
    );

    const difference = target - currentTime;

    if (difference <= 0) {
      return "Dispensing";
    }

    const totalSeconds = Math.floor(
      difference / 1000
    );

    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":");
  }, [currentTime, nextDose]);

  const getStatus = (timeOfDay) => {
    return patientData.medicationStatus[timeOfDay]
      ? "Taken"
      : "Scheduled";
  };

  const morningStatus = getStatus("morning");
  const afternoonStatus = getStatus("afternoon");
  const nightStatus = getStatus("night");

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
      <Sidebar darkMode={darkMode} />

      <main className="page-main">
        <Topbar
          title="Medication"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="medication-body">




          {/* ==========================================
              MAIN MEDICATION OVERVIEW
          ========================================== */}

          <div
            className={`next-dose-card ${
              darkMode
                ? "dark-card"
                : "light-card"
            }`}
          >
            <div className="hero-layout">

              {/* LEFT SIDE */}

              <div className="hero-left">

                <span className="next-dose-tag">
                  {nextDose
                    ? "NEXT SCHEDULED DOSE"
                    : "TODAY'S MEDICATION"}
                </span>

                <h2>
                  {nextDose
                    ? nextDose.time
                    : "All Complete"}
                </h2>

                <div className="next-chip">
                  {nextDose
                    ? `${nextDose.label} Dose`
                    : "All doses completed"}
                </div>

                <p>
                  {nextDose
                    ? `The ${nextDose.label.toLowerCase()} medication will be dispensed automatically at the scheduled time.`
                    : "All scheduled medications for today have been completed."}
                </p>


                {/* Progress */}

                <div className="progress-strip">

                  <div className="progress-item">
                    <CheckCircle2 size={18} />

                    <div>
                      <span>Today's Progress</span>

                      <h4>
                        {adherence.taken} /{" "}
                        {adherence.total} Doses
                      </h4>
                    </div>
                  </div>


                  <div className="progress-item">
                    <Pill size={18} />

                    <div>
                      <span>Medication Status</span>

                      <h4>
                        {adherence.percentage === 100
                          ? "All Doses Completed"
                          : `${adherence.percentage}% Completed`}
                      </h4>
                    </div>
                  </div>

                </div>


                {/* Simple status */}

                <div className="medication-status-summary">

                  <div className="summary-icon">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <span>Automatic Medication Management</span>

                    <strong>
                      Medication is marked as taken after dispensing.
                    </strong>
                  </div>

                </div>

              </div>


              {/* RIGHT SIDE */}

              <div className="hero-right">

                {/* Countdown */}

                <div className="countdown-box">

                  <Clock3 size={30} />

                  <span>
                    {nextDose
                      ? "Time Until Next Dose"
                      : "Today's Schedule"}
                  </span>

                  <h3>
                    {countdown}
                  </h3>

                </div>


                {/* Patient Status */}

                <div className="patient-status-card">

                  <h4>
                    Patient Overview
                  </h4>

                  <div className="status-row">

                    <span>
                      Heart Rate
                    </span>

                    <span>
                      <HeartPulse size={13} />
                      {patientData.heartRate} BPM
                    </span>

                  </div>


                  <div className="status-row">

                    <span>
                      Battery
                    </span>

                    <span>
                      <BatteryMedium size={13} />
                      {patientData.battery}%
                    </span>

                  </div>


                  <div className="status-row">

                    <span>
                      Location
                    </span>

                    <span
                      className={
                        Number(
                          patientData.gpsDistance
                        ) <= 200
                          ? "status-green"
                          : "status-warning"
                      }
                    >
                      <MapPin size={13} />

                      {Number(
                        patientData.gpsDistance
                      ) <= 200
                        ? "Safe"
                        : "Warning"}
                    </span>

                  </div>

                </div>

              </div>

            </div>
          </div>


          {/* ==========================================
              WEEKLY PLANNER
          ========================================== */}

          <WeeklyPlanner
            darkMode={darkMode}
          />


          {/* ==========================================
              DAILY TIMELINE
          ========================================== */}

          <h2 className="timeline-heading">
            Daily Medication Schedule
          </h2>


          <div className="schedule-grid">

            {schedules.map((schedule) => {

              const status =
                getStatus(schedule.key);

              return (
                <div
                  key={schedule.key}
                  className={`schedule-card ${schedule.key}`}
                >

                  <div className="schedule-header">

                    <div className="schedule-icon">
                      {schedule.icon}
                    </div>

                    <div>

                      <h3>
                        {schedule.label}
                      </h3>

                      <p>
                        {schedule.time}
                      </p>

                    </div>

                  </div>


                  <div className="timeline-list">

                    <div className="timeline-item">

                      <div className="timeline-time">
                        {schedule.time}
                      </div>

                      <span
                        className={`dose-status ${
                          status.toLowerCase()
                        }`}
                      >
                        {status}
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </main>
    </div>
  );
}