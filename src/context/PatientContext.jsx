import { createContext, useContext, useState } from "react";

const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patientData, setPatientData] = useState({
    // ==========================================
    // PATIENT
    // ==========================================

    name: "Lakshmi Amma",
    age: 72,

    // ==========================================
    // WRISTBAND
    // ==========================================

    heartRate: 76,
    spo2: 98,
    battery: 84,

    // ==========================================
    // GPS
    // ==========================================

    gpsStatus: "Inside Safe Zone",
    gpsDistance: 38,

    // ==========================================
    // MEDICATION STATUS
    // ONLY MORNING / AFTERNOON / NIGHT
    // ==========================================

    medicationStatus: {
      morning: false,
      afternoon: false,
      night: false,
    },

    // ==========================================
    // ALERTS
    // ==========================================

    alerts: [
      {
        id: 1,
        type: "warning",
        title: "Night medication pending",
        time: "8:00 PM",
        description:
          "Night medication is scheduled for dispensing.",
      },
    ],
  });

  // ==========================================
  // DAILY ADHERENCE
  // ==========================================

  const getAdherence = () => {
    const status = patientData.medicationStatus;

    const takenCount =
      Number(status.morning) +
      Number(status.afternoon) +
      Number(status.night);

    const total = 3;

    return {
      taken: takenCount,
      total,
      percentage: Math.round(
        (takenCount / total) * 100
      ),
    };
  };

  // ==========================================
  // MARK MEDICINE AS TAKEN
  // Automatically called when the scheduled
  // dispensing time has been reached.
  // ==========================================

  const markMedicineTaken = (timeOfDay) => {
    if (
      !["morning", "afternoon", "night"].includes(
        timeOfDay
      )
    ) {
      return;
    }

    setPatientData((prev) => {
      // Prevent duplicate updates
      if (prev.medicationStatus[timeOfDay]) {
        return prev;
      }

      const displayName =
        timeOfDay.charAt(0).toUpperCase() +
        timeOfDay.slice(1);

      const newAlert = {
        id: Date.now(),
        type: "success",
        title: `${displayName} medication taken`,
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        description:
          "Medication was automatically dispensed at the scheduled time.",
      };

      return {
        ...prev,

        medicationStatus: {
          ...prev.medicationStatus,
          [timeOfDay]: true,
        },

        alerts: [newAlert, ...prev.alerts],
      };
    });
  };

  // ==========================================
  // RESET DAILY MEDICATION STATUS
  // Useful for demo/testing
  // ==========================================

  const resetMedicationStatus = () => {
    setPatientData((prev) => ({
      ...prev,

      medicationStatus: {
        morning: false,
        afternoon: false,
        night: false,
      },
    }));
  };

  // ==========================================
  // UPDATE GPS DATA
  // ==========================================

  const updateGPS = (distance) => {
    const numericDistance = Number(distance);

    setPatientData((prev) => ({
      ...prev,

      gpsDistance: numericDistance,

      gpsStatus:
        numericDistance > 200
          ? "Outside Safe Zone"
          : "Inside Safe Zone",
    }));
  };

  // ==========================================
  // UPDATE WRISTBAND DATA
  // ==========================================

  const updateWristband = (data) => {
    setPatientData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <PatientContext.Provider
      value={{
        patientData,
        setPatientData,
        getAdherence,
        markMedicineTaken,
        resetMedicationStatus,
        updateGPS,
        updateWristband,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

// ==========================================
// CUSTOM HOOK
// ==========================================

export const usePatient = () =>
  useContext(PatientContext);