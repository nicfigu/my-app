import React from "react";
import Face from "./face-recognition/face";

interface FaceDetectionProps {
  onFaceDetected: (detected: boolean) => void;
}

const FaceDetection: React.FC<FaceDetectionProps> = ({ onFaceDetected }) => (
  <div className="w-[110px] h-[110px]">
    <Face onFaceDetected={onFaceDetected} />
  </div>
);

export default FaceDetection;
