import "./Settings.css";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

import {
  User,
  Clock3,
  Phone,
  MapPin,
  Bell,
  Save,
} from "lucide-react";

export default function Settings() {
  const { darkMode, setDarkMode } = useTheme();

  const [safeRadius, setSafeRadius] = useState(200);

  const [notifications, setNotifications] = useState({
    medicine: true,
    battery: true,
    gps: true,
  });

  const handleSave = () => {
    // Settings can be connected to backend storage later.
    console.log("Settings saved");
  };

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
          title="Settings"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />


        <div className="settings-body">

          {/* =================================================
              PAGE HEADING
          ================================================= */}

          <div className="settings-heading">

            <div className="settings-heading-content">

              <span className="section-tag">
                CAREGIVER SETTINGS
              </span>

              <h1>
                PillCare Settings
              </h1>

              <p>
                Manage patient information, medication
                times, emergency contacts, GPS safe zone
                and notification preferences.
              </p>

            </div>


            {/* =================================================
                SAVE BUTTON
            ================================================= */}

            <button
              className="top-save-button"
              onClick={handleSave}
            >
              <Save size={15} />

              Save Settings
            </button>

          </div>


          {/* =================================================
              PATIENT PROFILE
          ================================================= */}

          <div className="settings-card">

            <div className="card-title">

              <div className="card-title-icon profile-icon">
                <User size={18} />
              </div>

              <div>

                <h2>
                  Patient Profile
                </h2>

                <p>
                  Basic patient information
                </p>

              </div>

            </div>


            <div className="settings-grid">

              <div className="input-box">

                <label>
                  Patient Name
                </label>

                <input
                  defaultValue="Lakshmi Amma"
                />

              </div>


              <div className="input-box">

                <label>
                  Age
                </label>

                <input
                  defaultValue="72 Years"
                />

              </div>


              <div className="input-box">

                <label>
                  Blood Group
                </label>

                <input
                  defaultValue="O +ve"
                />

              </div>


              <div className="input-box">

                <label>
                  Patient ID
                </label>

                <input
                  defaultValue="PC-2026-001"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              MEDICATION TIMES
          ================================================= */}

          <div className="settings-card">

            <div className="card-title">

              <div className="card-title-icon medication-icon">
                <Clock3 size={18} />
              </div>

              <div>

                <h2>
                  Medication Times
                </h2>

                <p>
                  Set the daily dispensing schedule
                </p>

              </div>

            </div>


            <div className="settings-grid">

              <div className="input-box">

                <label>
                  Morning
                </label>

                <input
                  type="time"
                  defaultValue="08:00"
                />

              </div>


              <div className="input-box">

                <label>
                  Afternoon
                </label>

                <input
                  type="time"
                  defaultValue="14:00"
                />

              </div>


              <div className="input-box">

                <label>
                  Night
                </label>

                <input
                  type="time"
                  defaultValue="20:00"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              EMERGENCY CONTACTS
          ================================================= */}

          <div className="settings-card">

            <div className="card-title">

              <div className="card-title-icon contact-icon">
                <Phone size={18} />
              </div>

              <div>

                <h2>
                  Emergency Contacts
                </h2>

                <p>
                  Contacts for emergency notifications
                </p>

              </div>

            </div>


            <div className="settings-grid">

              <div className="input-box">

                <label>
                  Primary Caregiver
                </label>

                <input
                  defaultValue="+91 9876543210"
                />

              </div>


              <div className="input-box">

                <label>
                  Secondary Contact
                </label>

                <input
                  defaultValue="+91 9123456789"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              GPS SAFE ZONE
          ================================================= */}

          <div className="settings-card">

            <div className="card-title">

              <div className="card-title-icon gps-icon">
                <MapPin size={18} />
              </div>

              <div>

                <h2>
                  GPS Safe Zone
                </h2>

                <p>
                  Define the patient's allowed movement
                  radius.
                </p>

              </div>

            </div>


            <div className="radius-content">

              <div className="radius-value">

                <span>
                  Safe Radius
                </span>

                <strong>
                  {safeRadius} m
                </strong>

              </div>


              <input
                className="radius-slider"
                type="range"
                min="100"
                max="500"
                step="25"
                value={safeRadius}
                onChange={(e) =>
                  setSafeRadius(
                    Number(e.target.value)
                  )
                }
              />


              <div className="radius-labels">

                <span>
                  100 m
                </span>

                <span>
                  200 m
                </span>

                <span>
                  300 m
                </span>

                <span>
                  400 m
                </span>

                <span>
                  500 m
                </span>

              </div>


              <p className="radius-description">
                A location warning will be generated
                when the patient moves outside this
                safe radius.
              </p>

            </div>

          </div>


          {/* =================================================
              NOTIFICATION PREFERENCES
          ================================================= */}

          <div className="settings-card">

            <div className="card-title">

              <div className="card-title-icon notification-icon">
                <Bell size={18} />
              </div>

              <div>

                <h2>
                  Notification Preferences
                </h2>

                <p>
                  Choose which notifications you want
                  to receive.
                </p>

              </div>

            </div>


            {/* Medication */}

            <div className="toggle-row">

              <div className="toggle-info">

                <span className="toggle-symbol">
                  💊
                </span>

                <div>

                  <strong>
                    Medication Alerts
                  </strong>

                  <p>
                    Receive alerts for medication
                    schedule events.
                  </p>

                </div>

              </div>


              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications.medicine}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      medicine:
                        !prev.medicine,
                    }))
                  }
                />

                <span className="slider"></span>

              </label>

            </div>


            {/* Battery */}

            <div className="toggle-row">

              <div className="toggle-info">

                <span className="toggle-symbol">
                  🔋
                </span>

                <div>

                  <strong>
                    Wristband Battery Alerts
                  </strong>

                  <p>
                    Receive a notification when the
                    wristband battery is low.
                  </p>

                </div>

              </div>


              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications.battery}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      battery:
                        !prev.battery,
                    }))
                  }
                />

                <span className="slider"></span>

              </label>

            </div>


            {/* GPS */}

            <div className="toggle-row">

              <div className="toggle-info">

                <span className="toggle-symbol">
                  📍
                </span>

                <div>

                  <strong>
                    GPS Safe Zone Alerts
                  </strong>

                  <p>
                    Receive a notification when the
                    patient leaves the safe zone.
                  </p>

                </div>

              </div>


              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications.gps}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      gps:
                        !prev.gps,
                    }))
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}