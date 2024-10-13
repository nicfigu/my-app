import React, { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import SpeechRecognition from "./components/SpeechRecognition";
import WelcomeMessage from "./components/WelcomeMessage";
import EventPage from "./components/EventPage";
import TextToSpeech from "./components/TTS";
import Dmodel from "./components/dmodel";
import Dmodel2 from "./components/room";
import atrium from "./components/images/atrium.png";
import room from "./components/images/2009.png";

const App: React.FC = () => {
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [note, setNote] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [cluResult, setCluResult] = useState<string | null>(null);
  const [shouldPlayTTS, setShouldPlayTTS] = useState(false);
  const [useDModel, setUseDModel] = useState(0);
  const ttsPlayedRef = useRef(false);

  const clearNote = useCallback(() => {
    setNote("");
    setCluResult(null);
    setShouldPlayTTS(false);
    ttsPlayedRef.current = false;
  }, []);

  const handleSpeechRecognitionDone = useCallback(() => {
    if (
      note === "how can I get to the Patriot hacks award ceremony" ||
      note === "how can I get to the patriot hacks award ceremony" ||
      note === "how can I get to the Patriot acts award ceremony" ||
      note === "can I get to the Patriot hacks award ceremony"
    ) {
      const response =
        "The patriot hacks award ceremony is at the atrium, which is down the stairs, and to the left. If you need help getting there, scan the QR code for an augmented reality guide! You can also refer to the following 3D model for directions.";
      setCluResult(response);
      ttsPlayedRef.current = false;
      setShouldPlayTTS(true);
      setUseDModel(1);
    } else if (
      note === "where is my reserved room" ||
      note === "where's my reserved room"
    ) {
      const response =
        "Hi Nick, your reserved room is at the second floor, room 2009 and is reserved for 6:00 PM. If you need help getting there follow the yellow line on the 3D model or scan the QR code for an augmented reality guide!";
      setCluResult(response);
      ttsPlayedRef.current = false;
      setShouldPlayTTS(true);
      setUseDModel(2);
    } else if (note === "When is the closing ceremony") {
      const response =
        "The closing ceremony is at 2:00 PM in the atrium. Refer to the 3D model for directions or use the augmented reality guide!";
      setCluResult(response);
      ttsPlayedRef.current = false;
      setShouldPlayTTS(true);
      setUseDModel(1);
    }
  }, [note]);

  const handleTTSEnd = useCallback(() => {
    setShouldPlayTTS(false);
    ttsPlayedRef.current = true;
  }, []);

  useEffect(() => {
    // Reset TTS played status when note changes
    ttsPlayedRef.current = false;
  }, [note]);

  return (
    <div
      className={`App w-full h-[100vh] flex flex-col bg-gradient-to-tr from-green-400 to-purple-400 ${
        cluResult ? "overflow-scroll" : "overflow-clip"
      }`}
    >
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
              onDone={handleSpeechRecognitionDone}
            />
            {cluResult && shouldPlayTTS && !ttsPlayedRef.current && (
              <TextToSpeech
                text={cluResult}
                play={true}
                onPlayEnd={handleTTSEnd}
              />
            )}
            <span className="text-3xl font-bold mt-[-160px]">{cluResult}</span>
            {cluResult && useDModel === 1 ? (
              <div className="flex flex-row items-center gap-36 w-full">
                <Dmodel />
                <img src={atrium} alt="atrium" className="w-[35%] h-[35%]" />
              </div>
            ) : cluResult && useDModel === 2 ? (
              <div className="flex flex-row items-center gap-36 w-100%">
                <Dmodel2 />
                <img src={room} alt="room" className="w-[35%] h-[35%]" />
              </div>
            ) : null}
          </>
        ) : (
          <>
            <EventPage />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
