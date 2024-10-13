{
  /*import { SpeechRecognitionService } from "./components/SpeechRecognition/SpeechRecognition";
const speechRecognitionRef = useRef<SpeechRecognitionService | null>(null);*/
  /*const handleStartTalking = async () => {
    if (speechRecognitionRef.current) {
      try {
        await speechRecognitionRef.current.startContinuousRecognition(
          (text) => {
            setRecognizedText(text);
          }
        );
        setIsTalking(true);
      } catch (err) {
        console.error(
          "Failed to start speech recognition. Please check your microphone access.",
          err
        );
      }
    }
  };

  const handleStopTalking = async () => {
    if (speechRecognitionRef.current) {
      try {
        await speechRecognitionRef.current.stopContinuousRecognition();
        setIsTalking(false);
      } catch (err) {
        console.error("Failed to stop speech recognition.");
      }
    }
  };

  
  useEffect(() => {
    // Initialize speech recognition service
    try {
      speechRecognitionRef.current = new SpeechRecognitionService();
    } catch (err) {
      console.error(
        "Failed to initialize speech recognition. Please check your Azure credentials.",
        err
      );
    }

    return () => {
      // Clean up speech recognition on component unmount
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stopContinuousRecognition();
      }
    };
  }, []);
*/
}
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SpeechRecognition from "./components/SpeechRecognition";
import WelcomeMessage from "./components/WelcomeMessage";
import EventPage from "./components/EventPage";
const App: React.FC = () => {
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [note, setNote] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [cluResult, setCluResult] = useState<any>(null);
  const clearNote = useCallback(() => {
    setNote("");
  }, []);

  return (
    <div className="App w-full h-[100vh] overflow-hidden flex flex-col bg-gradient-to-tr from-green-400 to-purple-400">
      <Header onFaceDetected={setIsFaceDetected} onClearNote={clearNote} />
      <div className="flex-grow flex flex-col items-center justify-center">
        {isFaceDetected ? (
          <>
            <WelcomeMessage note={note} />
            <SpeechRecognition
              isListening={isListening}
              setIsListening={setIsListening}
              setNote={setNote}
              note={note}
            />
          </>
        ) : (
          <EventPage />
        )}
      </div>
    </div>
  );
};

export default App;
