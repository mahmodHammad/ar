import React, {useEffect, useRef } from "react";
import { sceneSetup } from "./three/setup";
import { startAnimationLoop } from "./three/Animate";

export default function App() {
  const Target = useRef(null);

  useEffect(() => {
    sceneSetup( Target.current);
    startAnimationLoop();
  }, []);

  return (
      <div ref={Target} className="canvas"></div>
  );
}
