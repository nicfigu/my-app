import React, { useEffect, useState } from "react";
import { textToSpeech } from "./AzureTTS";

interface TextToSpeechProps {
  text: string;
  play: boolean;
  onPlayEnd: () => void;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  play,
  onPlayEnd,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (play && text) {
      handleSpeak();
    }
    // Cleanup when component unmounts or audio changes
    return () => {
      if (audio) {
        audio.pause(); // Stop the audio when the component is re-rendered or unmounted
        setAudio(null); // Clear the audio instance
      }
    };
  }, [play, text]);

  const handleSpeak = async () => {
    try {
      if (audio) {
        audio.pause(); // Stop any previous audio
        audio.currentTime = 0; // Reset the audio to the start
      }

      const audioData = await textToSpeech(text);
      const blob = new Blob([audioData], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      const newAudio = new Audio(url);
      setAudio(newAudio);
      newAudio.play();
      newAudio.onended = () => {
        URL.revokeObjectURL(url); // Clean up the blob URL
        onPlayEnd(); // Callback when playback is done
      };
    } catch (error) {
      console.error("Error in text-to-speech:", error);
      onPlayEnd(); // Ensure the callback runs even if there's an error
    }
  };

  return null; // The component does not render any visible UI
};

export default TextToSpeech;
