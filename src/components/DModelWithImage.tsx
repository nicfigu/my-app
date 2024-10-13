import React from "react";
import DModelAtrium from "./dmodel";
import DModelRoom from "./room";
import atrium from "./images/atrium.png";
import room from "./images/2009.png";

interface DmodelWithImageProps {
  modelType: number;
}

const DmodelWithImage: React.FC<DmodelWithImageProps> = ({ modelType }) => {
  const getModelAndImage = () => {
    switch (modelType) {
      case 1:
        return (
          <>
            <div style={{ width: "50%", height: "300px" }}>
              <DModelAtrium />
            </div>
            <img
              src={atrium}
              alt="atrium"
              className="w-[40%] h-[40%] object-contain"
            />
          </>
        );
      case 2:
        return (
          <>
            <div style={{ width: "50%", height: "300px" }}>
              <DModelRoom />
            </div>
            <img
              src={room}
              alt="room"
              className="w-[40%] h-[40%] object-contain"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full">
      {getModelAndImage()}
    </div>
  );
};

export default DmodelWithImage;
