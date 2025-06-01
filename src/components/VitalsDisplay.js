import React from "react";

const VitalsMonitor = () => {
  // Hardcoded demo values
  const heartRate = "--";
  const spo2 = "--";
  const stepCount = "--";

  return (    <div style={{ 
      padding: "1.5rem",
      color: "white",
      borderRadius: "24px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>
      <h2 style={{ 
        margin: 0,
        fontSize: "1.5rem",
        color: "#F15C26",
        fontWeight: "bold"
      }}>Real-Time Health Metrics</h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "1rem",
          borderRadius: "12px"
        }}>
          <span style={{ fontSize: "1.5rem" }}>❤️</span>
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Heart Rate</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{heartRate} BPM</div>
          </div>
        </div>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "1rem",
          borderRadius: "12px"
        }}>
          <span style={{ fontSize: "1.5rem" }}>🫁</span>
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Blood Oxygen</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{spo2}%</div>
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "1rem",
          borderRadius: "12px"
        }}>
          <span style={{ fontSize: "1.5rem" }}>👟</span>
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Steps Today</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{stepCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalsMonitor;