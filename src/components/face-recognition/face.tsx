import React, { useEffect } from "react";
import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

const width = 100;
const height = 100;
interface FaceProps {
  onFaceDetected: (isDetected: boolean) => void;
}

const Face: React.FC<FaceProps> = ({ onFaceDetected }) => {
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),
      camera: ({ mediaSrc, onFrame }: CameraOptions) =>
        new Camera(mediaSrc, {
          onFrame,
          width,
          height,
        }),
    });
  useEffect(() => {
    onFaceDetected(detected);
  }, [detected, onFaceDetected]);

  return (
    <div>
      <div style={{ width, height, position: "relative" }}>
        {boundingBox.map((box, index) => (
          <div
            key={`${index + 1}`}
            style={{
              border: "1px solid red",
              position: "absolute",
              top: `${box.yCenter * 100}%`,
              left: `${box.xCenter * 100}%`,
              width: `${box.width * 100}%`,
              height: `${box.height * 100}%`,
              zIndex: 1,
            }}
          />
        ))}
        <Webcam
          ref={webcamRef}
          className="rounded-md"
          forceScreenshotSourceSize
          style={{
            height,
            width,
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
};

export default Face;
