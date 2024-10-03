import { PerspectiveCamera } from "three";
import { aspect, cameraZ } from "../systems/config";

function createCamera() {
  const fov = 50;
  const near = 0.1; // Set near clipping plane to a small value
  const far = 2000; // Set far clipping plane to a larger value

  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, cameraZ);

  return camera;
}

export { createCamera };