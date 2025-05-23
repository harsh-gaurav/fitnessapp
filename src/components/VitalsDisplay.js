// src/components/VitalsMonitor.js
import React, { useEffect, useState } from "react";
import { database, auth } from "../firebase"; // Import your Firebase instances
import { ref, onValue } from "firebase/database";

const VitalsMonitor = () => {
  const [heartRate, setHeartRate] = useState("-");
  const [spo2, setSpo2] = useState("-");
  const [stepCount, setStepCount] = useState("-");

  useEffect(() => {
    // Get current logged-in user
    const user = auth.currentUser;
    if (!user) {
      console.warn("No user logged in");
      return;
    }

    // Create a reference to this user's vitals in Realtime DB
    const userVitalsRef = ref(database, `users/${user.uid}`);

    // Listen to realtime updates
    const unsubscribe = onValue(userVitalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHeartRate(data.heartRate ?? "-");
        setSpo2(data.spo2 ?? "-");
        setStepCount(data.stepCount ?? "-");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "20px", color: "white", backgroundColor: "#222", borderRadius: "10px", maxWidth: "300px" }}>
      <h2>Real-Time Health Metrics</h2>
      <p>❤️ Heart Rate: {heartRate} BPM</p>
      <p>🫁 SpO2: {spo2} %</p>
      <p>👟 Step Count: {stepCount}</p>
    </div>
  );
};

export default VitalsMonitor;
