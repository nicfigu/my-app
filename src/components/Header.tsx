import React from "react";
import FaceDetection from "./FaceDetection";

interface HeaderProps {
  onFaceDetected: (detected: boolean) => void;
  onClearNote: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFaceDetected, onClearNote }) => (
  <div className="flex justify-between items-center w-full p-4">
    <img
      src="https://gmu.bynder.com/m/23ae598a3159a37/original/GM-monogramRGB-png.png"
      alt="GM Logo"
      className="w-[150px] cursor-pointer"
      onClick={onClearNote}
    />
    <h1 className="text-3xl font-bold text-center text-[#ECB23A] pr-11">
      Virtual Receptionist
    </h1>
    <div className="w-[110px] h-[110px]">
      <FaceDetection onFaceDetected={onFaceDetected} />
    </div>
  </div>
);

export default Header;
