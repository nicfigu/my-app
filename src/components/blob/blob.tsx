import React, { useEffect, useRef } from "react";
import p5 from "p5";

const BlobAnimation: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let blobRadius = 100;
      let noiseOffset = 0;

      // p5.js setup function
      p.setup = () => {
        p.createCanvas(350, 350);
        p.noStroke();
      };

      // p5.js draw function
      p.draw = () => {
        // Simulate loudness (this would be dynamic with real TTS)
        const loudness = p.map(p.sin(p.frameCount * 0.05), -1, 1, 0.5, 1.5);

        // Draw the blob with varying size based on loudness
        drawBlob(blobRadius * loudness);
      };

      const drawBlob = (size: number) => {
        p.push();
        p.translate(p.width / 2, p.height / 2);

        p.fill(0, 102, 51, 10);
        p.beginShape();

        for (let angle = 0; angle < p.TWO_PI; angle += 0.1) {
          const xOffset = p.cos(angle + noiseOffset) * size;
          const yOffset = p.sin(angle + noiseOffset) * size;
          p.vertex(xOffset, yOffset);
        }

        p.endShape(p.CLOSE);
        noiseOffset += 0.05; // Control the blob's "wobble"
        p.pop();
      };
    };

    if (sketchRef.current) {
      const p5Instance = new p5(sketch, sketchRef.current);

      return () => {
        p5Instance.remove();
      };
    }
  }, []);

  return <div ref={sketchRef} />;
};

export default BlobAnimation;
