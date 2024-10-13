import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline";

interface RoomProps {
  position: [number, number, number];
  size: [number, number, number];
}

interface StaircaseProps {
  position: [number, number, number];
  reverse: boolean;
  rotation?: [number, number, number];
}

interface WaypointProps {
  points: THREE.Vector3[];
  thickness?: number;
}

// Classroom component
const Classroom: React.FC<RoomProps> = ({ position, size }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color="lightblue" side={THREE.FrontSide} />
    </mesh>
  );
};

// Hallway component
const Hallway: React.FC<RoomProps> = ({ position, size }) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshBasicMaterial color="gray" />
    </mesh>
  );
};

// First floor foundation component
const FirstFloor: React.FC<RoomProps> = ({ position, size }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color="darkgray" side={THREE.FrontSide} />
    </mesh>
  );
};

// Foundation component
const Foundation: React.FC<RoomProps> = ({ position, size }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color="gray" />
    </mesh>
  );
};

// Staircase component
const Staircase: React.FC<StaircaseProps> = ({
  position,
  reverse,
  rotation,
}) => {
  const stepHeight = 0.2;
  const steps = Array.from({ length: 5 }, (_, i) => (
    <mesh
      key={i}
      position={[
        position[0],
        position[1] + i * stepHeight,
        reverse ? position[2] + i * 0.5 : position[2] - i * 0.5,
      ]}
      rotation={rotation}
    >
      <boxGeometry args={[0.5, stepHeight, 0.5]} />
      <meshBasicMaterial color="brown" />
    </mesh>
  ));

  return <>{steps}</>;
};

// Waypoint component using MeshLine for thicker lines
const Waypoint: React.FC<WaypointProps> = ({ points, thickness = 0.2 }) => {
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new MeshLine();
    line.setGeometry(geometry);
    return line;
  }, [points]);

  const material = new MeshLineMaterial({
    color: new THREE.Color("yellow"),
    lineWidth: thickness,
    transparent: true,
    opacity: 1.0,
  });

  return (
    <mesh>
      <primitive object={line} attach="geometry" />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

// Helper function to create 90-degree turn path
function createTurnPath(
  start: THREE.Vector3,
  turns: [string, number][]
): THREE.Vector3[] {
  let currentPoint = start.clone();
  const path = [currentPoint.clone()];

  for (const [direction, distance] of turns) {
    switch (direction) {
      case "x":
        currentPoint = currentPoint
          .clone()
          .add(new THREE.Vector3(distance, 0, 0));
        break;
      case "z":
        currentPoint = currentPoint
          .clone()
          .add(new THREE.Vector3(0, 0, distance));
        break;
      default:
        break;
    }
    path.push(currentPoint.clone());
  }

  return path;
}

// Building component with classrooms and waypoint
const Building: React.FC = () => {
  const entrance = new THREE.Vector3(0, 0.5, 6);

  const waypointsToClass1 = createTurnPath(entrance, [
    ["z", -6],
    ["x", 3],
  ]);

  return (
    <>
      <FirstFloor position={[0.5, 0, 0]} size={[3, 0.01, 12]} />
      <FirstFloor position={[-1.55, 0, 0]} size={[3, 0.01, 6.01]} />
      <FirstFloor position={[0, -0.5, 5]} size={[2, 1, 2]} />
      <FirstFloor position={[0, 2, -6]} size={[6, 5, 0.01]} />
      <FirstFloor position={[-3.5, 0, 2.4]} size={[1, 2, 0.01]} />
      <FirstFloor position={[-3, 0, -2.1]} size={[0.01, 2, 9]} />
      <Hallway position={[0, 0.006, 0]} size={[1, 10, 0]} />
      <Classroom position={[-2, 0.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[-2, 0.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[-2, 0.5, 1.5]} size={[2, 1, 3]} />
      <Classroom position={[2, 0.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[2, 0.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[2, 0.5, 4]} size={[2, 1, 3]} />
      <Staircase position={[0.7, 0.09, 5]} reverse={false} />
      <Waypoint points={waypointsToClass1} thickness={0.3} />
    </>
  );
};

// Basement component
const Basement: React.FC = () => {
  return (
    <>
      <Foundation position={[0, -1, 0]} size={[6, 0.01, 12]} />
      <Foundation position={[-1, -1, 4.2]} size={[6, 0.01, 3.7]} />
      <Classroom position={[-2, -0.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[-2, -0.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[2, -0.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[2, -0.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[2, -0.5, 4]} size={[2, 1, 3]} />
      <Staircase position={[-1.2, -0.9, 4]} reverse={true} />
    </>
  );
};

// Second floor component
const SecondFloor: React.FC = () => {
  return (
    <>
      <Foundation position={[0, 1, 2.25]} size={[3, 0.1, 1]} />
      <Foundation position={[0, 1, -6]} size={[3, 0.1, 1]} />
      <Classroom position={[-2, 1.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[-2, 1.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[-2, 1.5, 1.5]} size={[2, 1, 3]} />
      <Classroom position={[2, 1.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[2, 1.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[2, 1.5, 4]} size={[2, 1, 3]} />
    </>
  );
};

const DModel: React.FC = () => {
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{ position: [10, 5, 15], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Building />
      <Basement />
      <SecondFloor />
      <OrbitControls />
    </Canvas>
  );
};

export default DModel;
