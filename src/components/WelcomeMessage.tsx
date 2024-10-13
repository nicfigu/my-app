import React from "react";

interface WelcomeMessageProps {
  note: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ note }) => (
  <div
    className={`font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white text-center transition-all duration-1000 ${
      note === "" ? "text-6xl mt-[-75px]" : "text-xl bg-black p-1"
    }`}
  >
    <span>
      {note === "" ? (
        "Welcome to The Fuse!\n How can I help you today, Nick?"
      ) : (
        <span>
          <span className="text-3xl text-[#36a06b]">You: </span>
          {note}
        </span>
      )}
    </span>
  </div>
);

export default WelcomeMessage;
