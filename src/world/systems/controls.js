import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { cameraZ } from "./config";

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enablePan = false;
  controls.enableZoom = true; // Enable zooming
  controls.minDistance = cameraZ / 2; // Set minimum zoom distance
  controls.maxDistance = cameraZ * 2; // Set maximum zoom distance
  controls.autoRotateSpeed = 0.5;
  controls.autoRotate = true;

  controls.minPolarAngle = Math.PI / 3.5;
  controls.maxPolarAngle = Math.PI - Math.PI / 3;

  // forward controls.update to our custom .tick method
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };