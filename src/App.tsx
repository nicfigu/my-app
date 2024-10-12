import React, { useState, useEffect } from "react";
import "./App.css";
import BlobAnimation from "./components/blob/blob";

const App: React.FC = () => {
  const [isBlobDrawn, setIsBlobDrawn] = useState(false);

  // Simulate a delay before the blob is drawn, then trigger the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlobDrawn(true);
    }, 1000); // Adjust this delay as needed for your animation

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="App w-screen h-screen flex flex-col bg-gradient-to-tr from-green-600 to-purple-500">
      {/* Logo in the top left */}
      <div className="flex justify-start items-start p-4">
        <img
          src="https://gmu.bynder.com/m/23ae598a3159a37/original/GM-monogramRGB-png.png"
          alt="GM Logo"
          className="w-[150px]"
        />
      </div>

      {/* Animated Text */}
      <div
        className={`font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white text-4xl transition-all duration-1000 ${
          isBlobDrawn ? "mt-4 translate-y-[.5]" : "mt-40"
        }`}
      >
        Welcome to The Fuse
      </div>

      {/* Blob Animation */}
      <div className="flex-grow flex flex-col items-center mt-[-10]">
        {isBlobDrawn && <BlobAnimation />}
      </div>
    </div>
  );
};

export default App;
