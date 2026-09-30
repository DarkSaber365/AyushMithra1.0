import "./Alerts.css";
import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import {
  BellRing,
  CheckCircle2,
  TriangleAlert,
  BatteryMedium,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { usePatient } from "../../context/PatientContext";
import { useTheme } from "../../context/ThemeContext";

export default function Alerts() {
  const { darkMode, setDarkMode } = useTheme();

  const { patientData, getAdherence } = usePatient();

  const adherence = getAdherence();

  const isOutsideSafeZone =
    patientData.gpsStatus === "Outside Safe Zone";

  const isBatteryLow =
    Number(patientData.battery) <= 20;

  const pendingMedication =
    adherence.total - adherence.taken;


  /* ==========================================
     MEDICATION NOTIFICATIONS
  ========================================== */

  const medicationAlerts =
    patientData.alerts?.map((alert) => ({
      type: alert.type,
      icon:
        alert.type === "success" ? (
          <CheckCircle2 size={21} />
        ) : (
          <TriangleAlert size={21} />
        ),
      title: alert.title,
      message: alert.description,
      time: alert.time,
    })) || [];


  /* ==========================================
     GPS ALERT
  ========================================== */

  const gpsAlert = isOutsideSafeZone
    ? {
        type: "warning",
        icon: <TriangleAlert size={21} />,
        title: "Patient outside safe zone",
        message:
          "The patient's current location is outside the 200 metre safe zone.",
        time: "Live",
      }
    : null;


  /* ==========================================
     BATTERY ALERT
  ========================================== */

  const batteryAlert = isBatteryLow
    ? {
        type: "warning",
        icon: <BatteryMedium size={21} />,
        title: "Wristband battery low",
        message: `The wristband battery is at ${patientData.battery}%.`,
        time: "Live",
      }
    : null;


  /* ==========================================
     COMBINE NOTIFICATIONS
  ========================================== */

  const alerts = [
    ...medicationAlerts,
    ...(gpsAlert ? [gpsAlert] : []),
    ...(batteryAlert ? [batteryAlert] : []),
  ];


  /* ==========================================
     OVERALL STATUS
  ========================================== */

  const hasWarnings =
    isOutsideSafeZone || isBatteryLow;

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
          title="Alerts"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="alerts-body">

          {/* ==========================================
              PAGE HEADING
          ========================================== */}

          <div className="alerts-heading">

            <span className="section-tag">
              ALERT CENTER
            </span>

            <h1>
              Notifications & Alerts
            </h1>

            <p>
              Stay informed about medication progress,
              patient safety and important device events.
            </p>

          </div>


          {/* ==========================================
              SUMMARY CARDS
          ========================================== */}

          <div className="alert-summary-grid">

            {/* Completed */}

            <div className="summary-card success-card">

              <CheckCircle2 />

              <h2>
                {adherence.taken}
              </h2>

              <span>
                Completed Doses
              </span>

            </div>


            {/* Pending */}

            <div className="summary-card warning-card">

              <TriangleAlert />

              <h2>
                {pendingMedication}
              </h2>

              <span>
                Pending Doses
              </span>

            </div>


            {/* GPS */}

            <div
              className={`summary-card ${
                hasWarnings
                  ? "warning-card"
                  : "location-card"
              }`}
            >

              {isOutsideSafeZone ? (
                <TriangleAlert />
              ) : (
                <ShieldCheck />
              )}

              <h2>
                {isOutsideSafeZone
                  ? "Warning"
                  : "Safe"}
              </h2>

              <span>
                Patient Location
              </span>

            </div>


            {/* Battery */}

            <div
              className={`summary-card ${
                isBatteryLow
                  ? "warning-card"
                  : "battery-card"
              }`}
            >

              <BatteryMedium />

              <h2>
                {patientData.battery}%
              </h2>

              <span>
                Wristband Battery
              </span>

            </div>

          </div>


          {/* ==========================================
              NOTIFICATION LIST
          ========================================== */}

          <div className="notification-card">

            <div className="notification-header">

              <div className="notification-title-icon">
                <BellRing size={19} />
              </div>

              <div>
                <span className="notification-label">
                  RECENT ACTIVITY
                </span>

                <h2>
                  Recent Notifications
                </h2>
              </div>

            </div>


            {alerts.length > 0 ? (

              alerts.map((alert, index) => (

                <div
                  key={`${alert.title}-${index}`}
                  className={`alert-item ${alert.type}`}
                >

                  <div className="alert-icon">
                    {alert.icon}
                  </div>

                  <div className="alert-content">

                    <h3>
                      {alert.title}
                    </h3>

                    <p>
                      {alert.message}
                    </p>

                  </div>

                  <div className="alert-time">

                    <Clock3 size={14} />

                    {alert.time}

                  </div>

                </div>

              ))

            ) : (

              <div className="empty-alert-state">

                <div className="empty-alert-icon">
                  <CheckCircle2 size={24} />
                </div>

                <div>
                  <h3>
                    Everything looks good
                  </h3>

                  <p>
                    There are currently no alerts
                    requiring attention.
                  </p>
                </div>

              </div>

            )}

          </div>


        </div>

      </main>

    </div>
  );
}