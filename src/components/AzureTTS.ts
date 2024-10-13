import * as sdk from "microsoft-cognitiveservices-speech-sdk";

export const textToSpeech = async (text: string): Promise<ArrayBuffer> => {
  const speechConfig = await sdk.SpeechConfig.fromSubscription(
    "54087934a3e44738aaf2cdd91269cf57",
    "eastus"
  );
  console.log(speechConfig);
  speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";
  return new Promise((resolve, reject) => {
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          resolve(result.audioData);
        } else {
          reject(
            new Error(
              `Speech synthesis canceled, reason = ${
                sdk.ResultReason[result.reason]
              }`
            )
          );
        }
        synthesizer.close();
      },
      (error) => {
        console.error(`Error: ${error}`);
        synthesizer.close();
        reject(error);
      }
    );
  });
};
