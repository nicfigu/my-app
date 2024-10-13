import React, { useRef, useEffect, useState } from "react";
import blob from "./images/blob.gif";

interface SpeechRecognitionProps {
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  note: string;
  onDone: () => void;
}

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  isListening,
  setIsListening,
  setNote,
  note,
  onDone,
}) => {
  const micRef = useRef<SpeechRecognition | null>(null);
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    micRef.current = new SpeechRecognition();
    micRef.current.continuous = true;
    micRef.current.interimResults = false;
    micRef.current.lang = "en-US";

    micRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setNote(transcript);
    };

    micRef.current.onerror = (event) => {
      console.log(event.error);
    };

    micRef.current.onend = () => {
      setIsRecognitionActive(false);
      if (note) {
        onDone();
      }
    };

    return () => {
      if (micRef.current) {
        micRef.current.stop();
      }
    };
  }, [setNote, note, onDone]);

  useEffect(() => {
    if (isListening && !isRecognitionActive) {
      micRef.current?.start();
      setIsRecognitionActive(true);
    } else if (!isListening && isRecognitionActive) {
      micRef.current?.stop();
    }
  }, [isListening, isRecognitionActive]);

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  const showBlob = isListening || !note;
  const showAnimatedBlob = isListening;
  const showStaticBlob = !isListening && !note;

  return (
    <div className="mt-8 relative w-52 h-52">
      {showAnimatedBlob && (
        <img
          src={blob}
          alt="animated blob"
          className="absolute top-[-2] left-0 w-full h-full object-contain transition-all duration-1000 cursor-pointer"
          onClick={toggleListening}
        />
      )}
      {showStaticBlob && (
        <svg
          viewBox="0 0 405 405"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[-2] left-0 w-full h-full transition-all duration-1000 cursor-pointer"
          onClick={toggleListening}
        >
          <path
            d="M202.5,403.7603145092726C309.88549632920586,403.7603145092726,389.8687706381316,309.88549632920586,389.86877063813154,202.5C389.86877063813154,102.63682265209307,302.3631773479069,28.47861338406798,202.5,28.478613384068005C106.37946174231226,28.478613384068016,28.43812834384151,106.37946174231223,28.438128343841527,202.49999999999997C28.438128343841534,306.41414007149353,98.58585992850644,403.7603145092726,202.5,403.7603145092726"
            fill="#24A148"
          />
        </svg>
      )}
    </div>
  );
};

export default SpeechRecognition;
