import "./Wristband.css";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { useState } from "react";
import { usePatient } from "../../context/PatientContext";
import { useTheme } from "../../context/ThemeContext";

import {
  HeartPulse,
  BatteryMedium,
  MapPin,
  ShieldAlert,
  Droplets,
  ShieldCheck,
  TriangleAlert,
  Clock,
  CheckCircle2,
  Navigation,
} from "lucide-react";

export default function Wristband() {
  const { darkMode, setDarkMode } = useTheme();

  const { patientData } = usePatient();

  /* =====================================================
     GPS STATUS
  ===================================================== */

  const gpsSafe =
    Number(patientData.gpsDistance) <= 200;

  /* =====================================================
     BATTERY STATUS
  ===================================================== */

  const batteryLow =
    Number(patientData.battery) <= 20;

  /* =====================================================
     GPS COORDINATES
     
     Demo coordinates for the current displayed location.
     Replace these with live latitude/longitude values
     when the GPS hardware is connected.
  ===================================================== */

  const gpsCoordinates = {
    latitude: "12.9141",
    longitude: "77.6101",
  };

  /* =====================================================
     HEALTH TREND DATA
  ===================================================== */

  const heartRateTrend = [
    { time: "6 AM", value: 72 },
    { time: "9 AM", value: 78 },
    { time: "12 PM", value: 75 },
    { time: "3 PM", value: 81 },
    { time: "6 PM", value: 76 },
    { time: "9 PM", value: 73 },
  ];

  const spo2Trend = [
    { time: "6 AM", value: 98 },
    { time: "9 AM", value: 97 },
    { time: "12 PM", value: 99 },
    { time: "3 PM", value: 98 },
    { time: "6 PM", value: 97 },
    { time: "9 PM", value: 98 },
  ];

  /* =====================================================
     TREND SUMMARIES
  ===================================================== */

  const averageHeartRate = Math.round(
    heartRateTrend.reduce(
      (sum, point) => sum + point.value,
      0
    ) / heartRateTrend.length
  );

  const averageSpo2 = Math.round(
    spo2Trend.reduce(
      (sum, point) => sum + point.value,
      0
    ) / spo2Trend.length
  );

  const heartRateMin = Math.min(
    ...heartRateTrend.map((point) => point.value)
  );

  const heartRateMax = Math.max(
    ...heartRateTrend.map((point) => point.value)
  );

  const spo2Min = Math.min(
    ...spo2Trend.map((point) => point.value)
  );

  const spo2Max = Math.max(
    ...spo2Trend.map((point) => point.value)
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
          title="Wristband & Health"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="wristband-body">

          {/* =================================================
              LIVE HEALTH
          ================================================= */}

          <div className="section-heading-row">
            <div>
              <span className="section-mini-label">
                LIVE READINGS
              </span>

              <h2 className="section-title">
                Health Overview
              </h2>
            </div>

            <span className="live-status">
              <span></span>
              LIVE
            </span>
          </div>

          <div className="metrics-grid">

            {/* Heart Rate */}

            <div className="metric-card">

              <div className="metric-top">

                <div className="metric-icon heart">
                  <HeartPulse size={20} />
                </div>

                <span className="metric-live">
                  LIVE
                </span>

              </div>

              <span className="metric-label">
                Heart Rate
              </span>

              <h3>
                {patientData.heartRate}
                <small> BPM</small>
              </h3>

              <p>
                Current reading
              </p>

            </div>

            {/* SpO₂ */}

            <div className="metric-card">

              <div className="metric-top">

                <div className="metric-icon spo2">
                  <Droplets size={20} />
                </div>

                <span className="metric-live">
                  LIVE
                </span>

              </div>

              <span className="metric-label">
                SpO₂
              </span>

              <h3>
                {patientData.spo2}
                <small> %</small>
              </h3>

              <p>
                Current oxygen level
              </p>

            </div>

            {/* Battery */}

            <div className="metric-card">

              <div className="metric-top">

                <div className="metric-icon battery">
                  <BatteryMedium size={20} />
                </div>

                <span
                  className={
                    batteryLow
                      ? "metric-warning"
                      : "metric-live"
                  }
                >
                  {batteryLow
                    ? "LOW"
                    : "GOOD"}
                </span>

              </div>

              <span className="metric-label">
                Battery
              </span>

              <h3>
                {patientData.battery}
                <small> %</small>
              </h3>

              <p>
                Current battery level
              </p>

            </div>

          </div>

          {/* =================================================
              GPS TRACKING
          ================================================= */}

          <div className="section-heading-row">

            <div>

              <span className="section-mini-label">
                LOCATION MONITORING
              </span>

              <h2 className="section-title">
                GPS Tracking
              </h2>

            </div>

            <span
              className={`gps-status-pill ${
                gpsSafe
                  ? "gps-safe"
                  : "gps-warning"
              }`}
            >

              {gpsSafe ? (
                <ShieldCheck size={14} />
              ) : (
                <TriangleAlert size={14} />
              )}

              {gpsSafe
                ? "Safe"
                : "Warning"}

            </span>

          </div>

          <div className="gps-grid">

            {/* Live GPS Map */}

<div className="map-card">

  <div className="map-placeholder">

    <MapPin size={38} />

    <h4>
      Live GPS Map
    </h4>

    <p>
      Map integration can display the
      patient's current location here.
    </p>

  </div>

</div>

            {/* Location Information */}

            <div className="location-column">

              {/* Current Location */}

              <div className="location-card">

                <div className="location-icon green">
                  <MapPin size={19} />
                </div>

                <div>

                  <span>
                    Current Location
                  </span>

                  <h4>
                    BNMIT Campus, Bangalore
                  </h4>

                </div>

              </div>

              {/* Distance */}

              <div className="location-card">

                <div className="location-icon blue">
                  <MapPin size={19} />
                </div>

                <div>

                  <span>
                    Distance from Safe Zone
                  </span>

                  <h4>
                    {patientData.gpsDistance} metres
                  </h4>

                </div>

              </div>

              {/* Safe Zone Status */}

              <div className="location-card">

                <div className="location-icon orange">
                  <ShieldAlert size={19} />
                </div>

                <div>

                  <span>
                    Safe Zone Status
                  </span>

                  <h4
                    className={
                      gpsSafe
                        ? "inside-zone"
                        : "outside-zone"
                    }
                  >
                    {gpsSafe
                      ? "Safe"
                      : "Warning"}
                  </h4>

                </div>

              </div>

              {/* Coordinates */}

              <div className="location-card">

                <div className="location-icon blue">
                  <Navigation size={19} />
                </div>

                <div>

                  <span>
                    Coordinates
                  </span>

                  <h4>
                    {gpsCoordinates.latitude}° N,{" "}
                    {gpsCoordinates.longitude}° E
                  </h4>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              HEALTH TRENDS
          ================================================= */}

          <div className="section-heading-row trends-heading">

            <div>

              <span className="section-mini-label">
                HEALTH HISTORY
              </span>

              <h2 className="section-title">
                Health Trends
              </h2>

              <p className="trend-description">
                Recent demonstration readings across
                the last 24-hour monitoring period.
              </p>

            </div>

          </div>

          <div className="health-trends-grid">

            {/* =================================================
                HEART RATE TREND
            ================================================= */}

            <div className="trend-card">

              <div className="trend-card-header">

                <div className="trend-title">

                  <div className="trend-icon heart">
                    <HeartPulse size={18} />
                  </div>

                  <div>

                    <h3>
                      Heart Rate
                    </h3>

                    <span>
                      24-hour trend
                    </span>

                  </div>

                </div>

                <div className="trend-current">

                  <strong>
                    {patientData.heartRate}
                  </strong>

                  <span>
                    BPM now
                  </span>

                </div>

              </div>

              <div className="trend-summary">

                <div>

                  <span>
                    Average
                  </span>

                  <strong>
                    {averageHeartRate} BPM
                  </strong>

                </div>

                <div>

                  <span>
                    Range
                  </span>

                  <strong>
                    {heartRateMin}–{heartRateMax}
                  </strong>

                </div>

              </div>

              <div className="trend-chart heart-chart">

                {heartRateTrend.map((point) => {

                  const height =
                    Math.max(
                      20,
                      ((point.value - 65) / 20) * 100
                    );

                  return (
                    <div
                      className="trend-column"
                      key={point.time}
                    >

                      <span className="trend-value">
                        {point.value}
                      </span>

                      <div className="trend-bar-area">

                        <div
                          className="trend-bar heart-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                      </div>

                      <small>
                        {point.time}
                      </small>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* =================================================
                SPO2 TREND
            ================================================= */}

            <div className="trend-card">

              <div className="trend-card-header">

                <div className="trend-title">

                  <div className="trend-icon spo2">
                    <Droplets size={18} />
                  </div>

                  <div>

                    <h3>
                      SpO₂
                    </h3>

                    <span>
                      24-hour trend
                    </span>

                  </div>

                </div>

                <div className="trend-current">

                  <strong>
                    {patientData.spo2}%
                  </strong>

                  <span>
                    now
                  </span>

                </div>

              </div>

              <div className="trend-summary">

                <div>

                  <span>
                    Average
                  </span>

                  <strong>
                    {averageSpo2}%
                  </strong>

                </div>

                <div>

                  <span>
                    Range
                  </span>

                  <strong>
                    {spo2Min}–{spo2Max}%
                  </strong>

                </div>

              </div>

              <div className="trend-chart spo2-chart">

                {spo2Trend.map((point) => {

                  const height =
                    Math.max(
                      20,
                      ((point.value - 90) / 10) * 100
                    );

                  return (
                    <div
                      className="trend-column"
                      key={point.time}
                    >

                      <span className="trend-value">
                        {point.value}%
                      </span>

                      <div className="trend-bar-area">

                        <div
                          className="trend-bar spo2-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                      </div>

                      <small>
                        {point.time}
                      </small>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}