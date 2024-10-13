import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const loadFaceDetectionLibraries = async () => {
  await Promise.all([
    import("@mediapipe/face_detection"),
    import("@mediapipe/camera_utils"),
  ]);
};

loadFaceDetectionLibraries()
  .then(() => {
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error("Failed to load face detection libraries:", error);
  });
