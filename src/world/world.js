import { createCamera } from "./components/camera";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Loop } from "./systems/loop";
import { createControls } from "./systems/controls";
import { createLights } from "./components/lights";
import { Resizer } from "./systems/resizer";
import { Globe } from "./components/globe";
import { pointOfView } from "./systems/utils";

let camera;
let controls;
let renderer;
let scene;
let loop;
let globe;

class World {
  constructor(container) {
    renderer = createRenderer();
    scene = createScene();
    camera = createCamera();

    loop = new Loop(camera, scene, renderer);
    controls = createControls(camera, renderer.domElement);
    controls.update();
    loop.updatables.push(controls);

    const { ambientLight, dLight, dLight1, dLight2 } = createLights();
    camera.add(ambientLight, dLight, dLight1, dLight2);

    globe = new Globe();
    globe.init();
    loop.updatables.push(globe.instance);

    scene.add(camera, globe.instance);

    pointOfView(
      camera,
      controls,
      globe.instance,
      { lat: 22.3193, lng: 114.1694 },
      1000
    ); // China HongKong

    const resizer = new Resizer(camera, renderer);

    container.append(renderer.domElement);

    // Handle WebGL context loss
    renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      console.warn('WebGL context lost');
      this.stop();
    });

    renderer.domElement.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored');
      this.init();
      this.start();
    });
  }

  init() {
    // Reinitialize your scene and objects here
    scene = createScene();
    camera = createCamera();

    loop = new Loop(camera, scene, renderer);
    controls = createControls(camera, renderer.domElement);
    controls.update();
    loop.updatables.push(controls);

    const { ambientLight, dLight, dLight1, dLight2 } = createLights();
    camera.add(ambientLight, dLight, dLight1, dLight2);

    globe = new Globe();
    globe.init();
    loop.updatables.push(globe.instance);

    scene.add(camera, globe.instance);

    pointOfView(
      camera,
      controls,
      globe.instance,
      { lat: 22.3193, lng: 114.1694 },
      1000
    ); // China HongKong

    const resizer = new Resizer(camera, renderer);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

  getEvents() {
    return globe.getEvents();
  }

  stopRotation() {
    controls.autoRotate = false;
  }

  moveToLocation(lat, lng) {
    this.stopRotation(); // Stop the globe's rotation
    pointOfView(camera, controls, globe.instance, { lat, lng }, 1000);
  }
}

export { World };