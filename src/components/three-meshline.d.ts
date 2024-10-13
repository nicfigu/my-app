declare module "three.meshline" {
  import * as THREE from "three";

  export class MeshLine extends THREE.BufferGeometry {
    setGeometry(
      geometry: THREE.BufferGeometry | Float32Array | Array<number>
    ): void;
  }

  export class MeshLineMaterial extends THREE.ShaderMaterial {
    constructor(parameters?: {
      lineWidth?: number;
      color?: THREE.Color | string | number;
      opacity?: number;
      resolution?: THREE.Vector2;
      sizeAttenuation?: boolean;
      near?: number;
      far?: number;
      dashArray?: number;
      dashOffset?: number;
      dashRatio?: number;
      useMap?: boolean;
      alphaMap?: THREE.Texture;
      useAlphaMap?: boolean;
      alphaTest?: number;
      transparent?: boolean;
    });
  }
}
